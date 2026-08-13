import { useEffect, useState } from "react";

const timeZones = [
  {
    name: "India",
    city: "Mumbai",
    zone: "Asia/Kolkata",
    flag: "🇮🇳",
  },
  {
    name: "USA",
    city: "New York",
    zone: "America/New_York",
    flag: "🇺🇸",
  },
  {
    name: "United Kingdom",
    city: "London",
    zone: "Europe/London",
    flag: "🇬🇧",
  },
  {
    name: "Japan",
    city: "Tokyo",
    zone: "Asia/Tokyo",
    flag: "🇯🇵",
  },
  {
    name: "Australia",
    city: "Sydney",
    zone: "Australia/Sydney",
    flag: "🇦🇺",
  },
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [selectedZone, setSelectedZone] =
    useState("Asia/Kolkata");

  const [darkMode, setDarkMode] = useState(false);

  const [is24Hour, setIs24Hour] = useState(false);

  const [alarm, setAlarm] = useState("");

  const [alarmMessage, setAlarmMessage] = useState("");

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check alarm every second
  useEffect(() => {
    if (!alarm) return;

    const current = currentTime.toTimeString().slice(0, 5);

    if (current === alarm) {
      setAlarmMessage("⏰ Alarm is ringing!");
    }
  }, [currentTime, alarm]);

  // Get time for selected timezone
  function getTime(zone) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24Hour,
    }).format(currentTime);
  }

  // Get date
  function getDate(zone) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(currentTime);
  }

  // Analog clock calculations
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondDegree = seconds * 6;

  const minuteDegree =
    minutes * 6 + seconds * 0.1;

  const hourDegree =
    (hours % 12) * 30 + minutes * 0.5;

  function setAlarmHandler() {
    if (!alarm) {
      setAlarmMessage("Please select an alarm time.");
      return;
    }

    setAlarmMessage(`Alarm set for ${alarm}`);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>🌍 World Clock Dashboard</h1>
          <p>Real-Time Clock & Time Zone Management</p>
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <main>

        {/* ANALOG CLOCK */}
        <section className="card">
          <h2>Analog Clock</h2>

          <div className="clock">

            {[...Array(12)].map((_, index) => {
              const number = index + 1;
              const degree = number * 30;

              return (
                <span
                  key={number}
                  className="clock-number"
                  style={{
                    transform: `
                      rotate(${degree}deg)
                      translateY(-125px)
                      rotate(-${degree}deg)
                    `,
                  }}
                >
                  {number}
                </span>
              );
            })}

            <div
              className="hand hour-hand"
              style={{
                transform: `rotate(${hourDegree}deg)`,
              }}
            />

            <div
              className="hand minute-hand"
              style={{
                transform: `rotate(${minuteDegree}deg)`,
              }}
            />

            <div
              className="hand second-hand"
              style={{
                transform: `rotate(${secondDegree}deg)`,
              }}
            />

            <div className="clock-center"></div>
          </div>
        </section>

        {/* DIGITAL CLOCK */}
        <section className="card digital-card">
          <div className="digital-header">
            <h2>Digital Clock</h2>

            <button
              className="format-button"
              onClick={() => setIs24Hour(!is24Hour)}
            >
              {is24Hour ? "24 Hour" : "12 Hour"}
            </button>
          </div>

          <div className="digital-time">
            {getTime(selectedZone)}
          </div>

          <p className="clock-format">
            {is24Hour ? "24-hour format" : "12-hour format"}
          </p>

          <p className="date">
            {getDate(selectedZone)}
          </p>

          <label>Select Time Zone</label>

          <select
            value={selectedZone}
            onChange={(e) =>
              setSelectedZone(e.target.value)
            }
          >
            {timeZones.map((item) => (
              <option
                key={item.zone}
                value={item.zone}
              >
                {item.flag} {item.city}
              </option>
            ))}
          </select>
        </section>

        {/* WORLD CLOCK */}
        <section className="card full-width">
          <h2>🌎 World Time Zones</h2>

          <div className="world-grid">
            {timeZones.map((item) => (
              <div
                className="zone-card"
                key={item.zone}
              >
                <div className="flag">
                  {item.flag}
                </div>

                <h3>{item.city}</h3>

                <p>{item.name}</p>

                <strong>
                  {getTime(item.zone)}
                </strong>

                <small>
                  {getDate(item.zone)}
                </small>
              </div>
            ))}
          </div>
        </section>

        {/* ALARM */}
        <section className="card full-width alarm-card">
          <h2>⏰ Alarm</h2>

          <div className="alarm-controls">

            <input
              type="time"
              value={alarm}
              onChange={(e) => {
                setAlarm(e.target.value);
                setAlarmMessage("");
              }}
            />

            <button onClick={setAlarmHandler}>
              Set Alarm
            </button>

            <button
              className="clear-button"
              onClick={() => {
                setAlarm("");
                setAlarmMessage("");
              }}
            >
              Clear
            </button>

          </div>

          {alarmMessage && (
            <p className="alarm-message">
              {alarmMessage}
            </p>
          )}
        </section>

      </main>

      <footer>
        Real-Time World Clock Dashboard | React Assignment
      </footer>

    </div>
  );
}

export default App;