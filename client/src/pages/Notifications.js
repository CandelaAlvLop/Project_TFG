import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./NavbarIn";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "../layouts/Notifications.css";
import { MdCancel } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";


function Notifications() {

    const NotificationList = ["General updates", "Daily Updates", "Weekly Updates", "Monthly Updates", "Alert Major Changes", "Campaigns Participating", "Research Campaigns",
        "Government Campaigns", "Education Campaigns", "Transport Campaigns", "Business Campaigns", "New Campaigns", "Email Notifications", "SMS Notifications", "App Notifications"];
    const [selectedNotification, setSelectedNotification] = useState([]);
    const [savedNotification, setSavedNotification] = useState([]);
    const [savedNotificationMessage, setSavedNotificationMessage] = useState(false);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        window.scrollTo(0, 0);
        //Get User notifications
        axios.get(`http://localhost:3001/UserManager/notification/${userId}`)
            .then((response) => {
                setSelectedNotification(response.data.notifications);
                setSavedNotification(response.data.notifications);
            }).catch((error) => {
                console.error("Error retrieving User notifications:", error);
            })
    }, [userId]);

    //Processing for checkbox selection and deselection
    function notificationSelection(value) {
        setSavedNotificationMessage(false);
        //If the previosuly checked value is deselected, a new array is created filtering that value
        if (selectedNotification.includes(value)) { setSelectedNotification(selectedNotification.filter(notification => notification !== value)); }
        //If the value is selected (is not stored in the array), the value is added to the array
        else { setSelectedNotification([...selectedNotification, value]); }
    }

    //Processing for "Select All" checkbox selection and deselction
    function notificationSelectionAll() {
        setSavedNotificationMessage(false);
        if (selectedNotification.length === NotificationList.length) {
            setSelectedNotification([]); //Unselect when already selected
        } else {
            setSelectedNotification(NotificationList);
        }
    }

    function saveNotifications() {
        setSavedNotification([...selectedNotification]);
        axios.post("http://localhost:3001/UserManager/notification", {
            userId,
            notifications: selectedNotification.join(",") //Join notifications to send to the backend as a single list
        }).then(() => {
            setSavedNotification([...selectedNotification]);
            setSavedNotificationMessage(true);
        }).catch((err) => {
            console.error("Error storing notifications:", err);
        });
    }

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="notification">
                <div className="notification-content">
                    <h2>Notifications Settings</h2>
                    <div className="checkboxesN-content">
                        <div className="select-all-notifications">
                            <label> <input type="checkbox" checked={selectedNotification.length === NotificationList.length} onChange={() => notificationSelectionAll()} />
                                Select All.
                            </label>
                        </div>
                        <label><input type="checkbox" checked={selectedNotification.includes("General updates")} onChange={() => notificationSelection("General updates")} />
                            I want to receive general platform updates.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Daily Updates")} onChange={() => notificationSelection("Daily Updates")} />
                            I want to receive a daily summary of my consumption data and relevant insights.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Weekly Updates")} onChange={() => notificationSelection("Weekly Updates")} />
                            I want to receive a weekly summary of my consumption data and relevant insights.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Monthly Updates")} onChange={() => notificationSelection("Monthly Updates")} />
                            I want to receive a monthly summary of my consumption data and relevant insights.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Alert Major Changes")} onChange={() => notificationSelection("Alert Major Changes")} />
                            I want to receive alerts about major changes in my data patterns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Campaigns Participating")} onChange={() => notificationSelection("Campaigns Participating")} />
                            I want to be notified about campaigns I am participating in.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Research Campaigns")} onChange={() => notificationSelection("Research Campaigns")} />
                            I want to be notified about research oriented campaigns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Government Campaigns")} onChange={() => notificationSelection("Government Campaigns")} />
                            I want to be notified about government driven campaigns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Education Campaigns")} onChange={() => notificationSelection("Education Campaigns")} />
                            I want to be notified about educational campaigns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Transport Campaigns")} onChange={() => notificationSelection("Transport Campaigns")} />
                            I want to be notified about transport oriented campaigns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Business Campaigns")} onChange={() => notificationSelection("Business Campaigns")} />
                            I want to be notified about business campaigns.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("New Campaigns")} onChange={() => notificationSelection("New Campaigns")} />
                            I want to be notified when new campaigns match my interests.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("Email Notifications")} onChange={() => notificationSelection("Email Notifications")} />
                            I agree to receive notifications via email.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("SMS Notifications")} onChange={() => notificationSelection("SMS Notifications")} />
                            I agree to receive notifications via SMS.
                        </label>
                        <label><input type="checkbox" checked={selectedNotification.includes("App Notifications")} onChange={() => notificationSelection("App Notifications")} />
                            I agree to receive notifications via app push notifications.
                        </label>

                        {savedNotificationMessage && <div className="notification-message">Notifications have been saved succesfully</div>}

                        <div className="buttons-notification">
                            <button className="save-notification" onClick={saveNotifications}><CiSaveDown2 /> Save</button>
                            <button className="cancel-notification" onClick={() => setSelectedNotification(savedNotification)}><MdCancel /> Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Notifications;