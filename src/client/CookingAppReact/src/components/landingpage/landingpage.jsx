import Header from "../landingpage/ui/header";
import Title from "../landingpage/ui/title";
import Benefits from "../landingpage/ui/benefits";
import DownloadMobile from "../landingpage/ui/downloadmobile";
import Footer from "../landingpage/ui/footer";


export default function LandingPage(){
    return(
        <>
            <Header />
            <Title />
            <Benefits/>
            <DownloadMobile/>
            <Footer/>
        </>
    )
}