import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import PersonalData from "./pages/PersonalData";
import PersonalData2 from "./pages/PersonalData2";
import Notifications from "./pages/Notifications";
import Notifications2 from "./pages/Notifications2";
import MyConsume from "./pages/MyConsume";
import DataDonation from "./pages/DataDonation";
import Campaigns from "./pages/Campaigns";
import MyCampaigns from "./pages/MyCampaigns";
import Instructions from "./pages/Instructions";
import Faq from "./pages/Faq";
import FaqInside from "./pages/FaqInside";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import WaterMyConsume from "./pages/WaterMyConsume";
import ElectricMyConsume from "./pages/ElectricMyConsume";
import GasMyConsume from "./pages/GasMyConsume";
import AddCampaign from "./pages/AddCampaign";
import EditCampaign from "./pages/EditCampaign";
import ViewCampaign from "./pages/ViewCampaign";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard2" element={<Dashboard2 />} />
                <Route path="/personaldata" element={<PersonalData />} />
                <Route path="/personaldata2" element={<PersonalData2 />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/notifications2" element={<Notifications2 />} />
                <Route path="/myconsume" element={<MyConsume />} />
                <Route path="/datadonation" element={<DataDonation />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/mycampaigns" element={<MyCampaigns />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/faqinside" element={<FaqInside />} />
                <Route path="/addproperty" element={<AddProperty />} />
                <Route path="/editproperty" element={<EditProperty />} />
                <Route path="/watermyconsume/:propertyId" element={<WaterMyConsume />} />
                <Route path="/electricmyconsume/:propertyId" element={<ElectricMyConsume />} />
                <Route path="/gasmyconsume/:propertyId" element={<GasMyConsume />} />
                <Route path="/addcampaign" element={<AddCampaign />} />
                <Route path="/editcampaign" element={<EditCampaign />} />
                <Route path="/viewcampaign" element={<ViewCampaign />} />
            </Routes>
        </Router>
    )
}

export default App;