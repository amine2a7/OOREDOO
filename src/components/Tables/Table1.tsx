import  { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table1 = () => {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState({});
  const [visitors, setVisitors] = useState({});
  const [badges, setBadges] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeUpdated, setBadgeUpdated] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [buildingStats, setBuildingStats] = useState({});
  const [employeeStats, setEmployeeStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitResponse = await fetch("http://localhost:5000/visit/getAllVisitsArchive");
        const visitResult = await visitResponse.json();
        setVisits(visitResult);

        const employeeIds = [...new Set(visitResult.map(item => item.employee))];
        const visitorIds = [...new Set(visitResult.map(item => item.visitor))];
        const badgeIds = [...new Set(visitResult.map(item => item.badge))];

        const employeeData = {};
        const visitorData = {};
        const badgeData = {};

        await Promise.all([
          ...employeeIds.map(async id => {
            const res = await fetch(`http://localhost:5000/employee/getEmployeeById/${id}`);
            const data = await res.json();
            employeeData[id] = data;
          }),
          ...visitorIds.map(async id => {
            const res = await fetch(`http://localhost:5000/visitor/getVisitorById/${id}`);
            const data = await res.json();
            visitorData[id] = data;
          }),
          ...badgeIds.map(async id => {
            const res = await fetch(`http://localhost:5000/badge/getBadgeById/${id}`);
            const data = await res.json();
            badgeData[id] = data;
          })
        ]);

        setEmployees(employeeData);
        setVisitors(visitorData);
        setBadges(badgeData);
        calculateStatistics(visitResult, badgeData, employeeData, startDate, endDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [badgeUpdated, startDate, endDate]);



  const filteredVisits = visits.filter(visit => {
    const startDateMatch = startDate === '' || new Date(visit.checkin) >= new Date(startDate);
    const endDateMatch = endDate === '' || new Date(visit.checkin) <= new Date(endDate);
    const buildingMatch = searchTerm === '' || badges[visit.badge]?.Badge?.batiment.includes(searchTerm);
    return startDateMatch && endDateMatch && buildingMatch;
  });

  const calculateStatistics = (visits, badgeData, employeeData, startDate, endDate) => {
    const buildingStats = {};
    const employeeStats = {};

    visits.forEach(visit => {
      const visitDate = new Date(visit.checkin);
      if ((startDate === '' || visitDate >= new Date(startDate)) && (endDate === '' || visitDate <= new Date(endDate))) {
        const badge = badgeData[visit.badge]?.Badge;
        const employee = employeeData[visit.employee]?.Employee;

        if (badge) {
          const building = badge.batiment;
          const year = visitDate.getFullYear();

          if (!buildingStats[building]) {
            buildingStats[building] = {};
            console.log(buildingStats);
          }

          if (!buildingStats[building][year]) {
            buildingStats[building][year] = 0;
            console.log(buildingStats);
          }

          buildingStats[building][year] += 1;
          console.log(buildingStats);
        }

        if (employee) {
          const direction = employee.direction;

          if (!employeeStats[direction]) {
            employeeStats[direction] = 0;
          }

          employeeStats[direction] += 1;
        }
      }
    });

    setBuildingStats(buildingStats);
    setEmployeeStats(employeeStats);
    console.log('Building Stats:', buildingStats); // Debugging log
  };

  const buildingLabels = [];
  const buildingDataSets = [];

  Object.keys(buildingStats).forEach(building => {
    const buildingData = [];
    const labels = [];

    Object.keys(buildingStats[building]).forEach(year => {
      labels.push(year);
      buildingData.push(buildingStats[building][year]);
    });

    if (labels.length > buildingLabels.length) {
      buildingLabels.splice(0, buildingLabels.length, ...labels);
      console.log(buildingStats);
    }

    buildingDataSets.push({
      label: building,
      data: buildingData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    });
  });

  const employeeData = {
    labels: Object.keys(employeeStats),
    datasets: [
      {
        label: 'Visiteurs par direction',
        data: Object.values(employeeStats),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <label style={{ textAlign: 'center', fontWeight: 'bold' }}>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ textAlign: 'center', fontWeight: 'bold' }}>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Statistiques par Bâtiment</h1>
        <Bar
          data={{
            labels: buildingLabels,
            datasets: buildingDataSets
          }}
          options={{ responsive: true }}
        />
      </div>
      <div>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Statistiques par Direction d'Employé</h2>
        <Bar data={employeeData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Table1;
