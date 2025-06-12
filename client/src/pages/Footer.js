import "../layouts/Footer.css";
import EUDataAltruism from "../images/EUDataAltruism.png";
import UPFLogo from "../images/UPFLogo.png";
import IdeasForChange from "../images/IdeasForChange.png";
import InBarcelonaOva from "../images/InBarcelonaOva.jpg";
import AjuntamentBarcelona from "../images/AjuntamentBarcelona1.jpg";
import MinisterioCienciaInnovacion from "../images/MinisterioCienciaInnovacion.png";
import AgenciaEstatalDeInvestigacion from "../images/AgenciaEstatalDeInvestigacion.png";
import ExcelenciaMariaDeMaetzu from "../images/ExcelenciaMariadeMaetzu.png";


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-up">
                <h2>DATALOG</h2>
                <h3>Association of Data for Planetary Well-being (DATALOG)</h3>
                <p>The goals of the association is to promote the knowledge of cities and their actors through data and intelligent systems that impact planetary well-being; fight against climate change, energy poverty, sustainable mobility, circular economy and environmental welfare of the people and the environment in general.</p>
                <img src={EUDataAltruism} alt="EU nonprofit organization of data management" />
            </div>

            <div className="footer-down">
                <div className="footer-section">
                    <h4>Created by</h4>
                    <img src={UPFLogo} alt="UPF Barcelona" className="UPFLogo" />
                    <img src={IdeasForChange} alt="Ideas for Change" className="IdeasForChange" />
                </div>

                <div className="footer-section">
                    <h4>Funded by</h4>
                    <img src={InBarcelonaOva} alt="InBarcelonaOva" className="InBarcelonaOva" />
                    <img src={AjuntamentBarcelona} alt="Barcelona City Council" className="AjuntamentBarcelona" />
                </div>

                <div className="footer-section">
                    <h4>Supported by</h4>
                    <img src={MinisterioCienciaInnovacion} alt="Ministry of Cience and Innovation" className="MinisterioCienciaInnovacion" />
                    <img src={AgenciaEstatalDeInvestigacion} alt="State Agency of Innovation" className="AgenciaEstatalDeInvestigacion" />
                    <img src={ExcelenciaMariaDeMaetzu} alt="Excelencia de Maria de Maetzu" className="ExcelenciaMariaDeMaetzu" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;