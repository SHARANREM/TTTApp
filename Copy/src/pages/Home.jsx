import { useState, useEffect, useTransition } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import nameBlack from "../assets/NameBlack.png";
import Drop from "../Components/Drop";
import styles from "./Home.module.scss";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setTimeout(() => setLoading(false), 1700);
    }, []);

    return (
        <>
            {loading && <Drop path={1} content={nameBlack} theme="dark" />}
            <div className={styles.headTitle}>
                <h1>Dharmamurthi Rao Bahadur Calavala Cunnan Chetty Hindu College</h1>        
                <h2>Department of Computer Applications</h2>
                <h3>Semester Time Table 2025-2026</h3>
            </div>
            {!loading && (
                
                <div className={styles.homeContainer}>

                    <div className={styles.leftColumn}>

                        {/* Calendar Card */}
                        <div className={styles.calendarCard}>
                            <h3 className={styles.cardTitle}>
                                {selectedDate.toLocaleString("en-US", {
                                    month: "long",
                                    year: "numeric"
                                })}
                            </h3>

                            <Calendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                className={styles.reactCalendar}
                            />
                        </div>

                        {/* Staff Directory */}
                        <StaffDirectory />
                    </div>

                    {/* Timetable */}
                    <div className={styles.rightColumn}>
                        <ScheduleCard selectedDate={selectedDate} />
                        <FullTimetable />
                    </div>

                </div>
            )}
        </>
    );
}


/* -----------------------
   Schedule Card Component
-------------------------- */
function ScheduleCard({ selectedDate }) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isPending, startTransition] = useTransition();
    
    // When date changes → reset
    useEffect(() => {
        startTransition(() => {
            setTimeLeft(null);
            setActiveIndex(null);
        });
    }, [selectedDate]);

    const mockTimetable = {
        1: [
            { subject: "Maths", staff: "Mr. Kumar", time: "11:00 – 12:00" },
            { subject: "Physics", staff: "Ms. Devi", time: "12:00 – 1:00" },
            { subject: "Chemistry", staff: "Dr. Rao", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "Biology", staff: "Ms. Priya", time: "2:40 – 3:35" },
            { subject: "Computer Science", staff: "Mr. Sanjay", time: "3:35 – 4:30" },
        ],
        2: [
            { subject: "History", staff: "Mr. Ravi", time: "11:00 – 12:00" },
            { subject: "Economics", staff: "Ms. Lakshmi", time: "12:00 – 1:00" },
            { subject: "Physics", staff: "Ms. Devi", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "Maths", staff: "Mr. Kumar", time: "2:40 – 3:35" },
            { subject: "Biology", staff: "Ms. Priya", time: "3:35 – 4:30" },
        ],
        3: [
            { subject: "Computer Science", staff: "Mr. Sanjay", time: "11:00 – 12:00" },
            { subject: "English", staff: "Mr. Arun", time: "12:00 – 1:00" },
            { subject: "Biology", staff: "Ms. Priya", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "Physics", staff: "Ms. Devi", time: "2:40 – 3:35" },
            { subject: "Economics", staff: "Ms. Lakshmi", time: "3:35 – 4:30" },
        ],
        4: [
            { subject: "Chemistry", staff: "Dr. Rao", time: "11:00 – 12:00" },
            { subject: "Biology", staff: "Ms. Priya", time: "12:00 – 1:00" },
            { subject: "History", staff: "Mr. Ravi", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "English", staff: "Mr. Arun", time: "2:40 – 3:35" },
            { subject: "Maths", staff: "Mr. Kumar", time: "3:35 – 4:30" },
        ],
        5: [
            { subject: "Economics", staff: "Ms. Lakshmi", time: "11:00 – 12:00" },
            { subject: "Maths", staff: "Mr. Kumar", time: "12:00 – 1:00" },
            { subject: "Computer Science", staff: "Mr. Sanjay", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "Biology", staff: "Ms. Priya", time: "2:40 – 3:35" },
            { subject: "Chemistry", staff: "Dr. Rao", time: "3:35 – 4:30" },
        ],
        6: [
            { subject: "Physics", staff: "Ms. Devi", time: "11:00 – 12:00" },
            { subject: "Computer Science", staff: "Mr. Sanjay", time: "12:00 – 1:00" },
            { subject: "Maths", staff: "Mr. Kumar", time: "1:00 – 2:00" },
            { subject: "Lunch", staff: "Mom", time: "2:00 – 2:40" },
            { subject: "History", staff: "Mr. Ravi", time: "2:40 – 3:35" },
            { subject: "English", staff: "Mr. Arun", time: "3:35 – 4:30" },
        ]
    };

    const dayOrder = [1, 2, 3, 4, 5, 6, 1][selectedDate.getDay()];
    const subjects = mockTimetable[dayOrder] || [];

    // ----------------------------
    // Time Calculator
    // ----------------------------
    // Converts timetable 1–6 PM hours into 24h format
    function convertTo24Hour(timeStr) {
        let [hour, min] = timeStr.split(":").map(Number);

        // 12 PM stays 12
        if (hour === 12) {
            return { hour: 12, min };
        }

        // Classes after lunch → 1 PM to 6 PM
        if (hour >= 1 && hour <= 6) {
            hour += 12;
        }

        return { hour, min };
    }



    const calculateTimeLeft = (timeRange, selectedDate) => {
        const [startStr, endStr] = timeRange.split("–").map(t => t.trim());

        const day = new Date(selectedDate);
        const now = new Date();

        // Normalize both dates (ignore seconds)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkDay = new Date(day);
        checkDay.setHours(0, 0, 0, 0);

        const start = new Date(day);
        const end = new Date(day);

        // Convert times
        const { hour: sHour, min: sMin } = convertTo24Hour(startStr);
        const { hour: eHour, min: eMin } = convertTo24Hour(endStr);

        start.setHours(sHour, sMin, 0, 0);
        end.setHours(eHour, eMin, 0, 0);

        /* ----------------------------------------
        1️⃣ PAST DAY
        ---------------------------------------- */
        if (checkDay < today) {
            return "Already ended";
        }

        /* ----------------------------------------
        2️⃣ FUTURE DAY → time difference
        ---------------------------------------- */
        if (checkDay > today) {
            const diffMs = start - now;

            const mins = Math.floor(diffMs / 60000);
            const hrs = Math.floor(mins / 60);
            const rem = mins % 60;

            if (diffMs <= 0) return "Starts soon";
            if (hrs <= 0) return `Starts in ${mins} mins`;
            if (hrs >= 10000) return `🤪 Has Long Long Time`;
            if (hrs >= 5000) return `🤪 Has Long Time`;
            return `Starts in ${hrs} hr ${rem} mins`;
        }

        /* ----------------------------------------
        3️⃣ TODAY DAY LOGIC
        ---------------------------------------- */

        // Class fully ended
        if (now > end) {
            return "Already ended";
        }

        // Class currently running
        if (now >= start && now <= end) {
            return "Already started";
        }

        // Class is upcoming today
        const diffMs = start - now;
        const mins = Math.floor(diffMs / 60000);
        const hrs = Math.floor(mins / 60);
        const rem = mins % 60;

        if (hrs <= 0 && mins > 0) return `Starts in ${mins} mins`;
        if (hrs > 0) return `Starts in ${hrs} hr ${rem} mins`;

        return "Starts soon";
    };


    const handleSubjectClick = (index, item) => {
        if(index === activeIndex){
            setActiveIndex(null);
            setTimeLeft(null);    
        }else{
            setActiveIndex(index);
            setTimeLeft(calculateTimeLeft(item.time, selectedDate));
        }
    };

    return (
        <div className={styles.scheduleCard}>
            <div className={styles.scheduleHeader}>
                <h2>Day Order {dayOrder}</h2>
                <span>{selectedDate.toDateString()}</span>
            </div>

            {subjects.length === 0 && (
                <div className={styles.noSchedule}>
                    <div className={styles.warningIcon}>!</div>
                    <h3>No Schedule Available</h3>
                </div>
            )}

            {subjects.length > 0 && (
                <div className={styles.subjectList}>
                    {subjects.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.subjectRow} ${
                                activeIndex === index ? styles.activeRow : ""
                            }`}
                            onClick={() => handleSubjectClick(index, item)}
                        >
                            <div className={styles.subjectLeft}>
                                <h4>{item.subject}</h4>
                                <p>{item.staff}</p>

                                {activeIndex === index && (
                                    <span className={styles.timeLeftText}>
                                        {timeLeft}
                                    </span>
                                )}
                            </div>

                            <div className={styles.timeBox}>{item.time}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


function StaffDirectory() {
    const staffList = [
        { name: "Mr. Kumar", subject: "Maths", email: "kumar@school.com" },
        { name: "Ms. Devi", subject: "Physics", email: "devi@school.com" },
        { name: "Dr. Rao", subject: "Chemistry", email: "rao@school.com" },
        { name: "Ms. Priya", subject: "Biology", email: "priya@school.com" },
        { name: "Mr. Sanjay", subject: "Computer Science", email: "sanjay@school.com" },
        { name: "Mr. Arun", subject: "English", email: "arun@school.com" },
        { name: "Mr. Ravi", subject: "History", email: "ravi@school.com" },
        { name: "Ms. Lakshmi", subject: "Economics", email: "lakshmi@school.com" },
    ];

    return (
        <div className={styles.staffCard}>
            <h3 className={styles.directoryTitle}>Staff Directory</h3>

            <div className={styles.staffGrid}>
                {staffList.map((staff, i) => (
                    <div key={i} className={styles.staffItem}>
                        <div className={styles.staffAvatar}>
                            {staff.name.charAt(0)}
                        </div>

                        <div className={styles.staffInfo}>
                            <h4>{staff.name}</h4>
                            <p>{staff.subject}</p>
                            <span>{staff.email}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FullTimetable() {
    const mockTimetable = {
        1: ["Maths","Physics","Chemistry","Lunch","Biology","CS"],
        2: ["History","Economics","Physics","Lunch","Maths","Biology"],
        3: ["CS","English","Biology","Lunch","Physics","Economics"],
        4: ["Chemistry","Biology","History","Lunch","English","Maths"],
        5: ["Economics","Maths","CS","Lunch","Biology","Chemistry"],
        6: ["Physics","CS","Maths","Lunch","History","English"],
    };

    return (
        <div className={styles.fullTableCard}>
            <h3 className={styles.fullTableTitle}>Full Timetable</h3>

            <div className={styles.tableWrapper}>
                <table className={styles.fullTable}>
                    <thead>
                        <tr>
                            <th>Day Order</th>
                            <th>1st Hr</th>
                            <th>2nd Hr</th>
                            <th>3rd Hr</th>
                            <th>Lunch</th>
                            <th>4th Hr</th>
                            <th>5th Hr</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.keys(mockTimetable).map((day) => (
                            <tr key={day}>
                                <td>{day}</td>
                                {mockTimetable[day].map((subj, i) => (
                                    <td key={i}>{subj}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
