import '../styles/Footer.css'
type ReactJsxElm = React.JSX.Element;

export default function Footer(): ReactJsxElm {
    return(
        <footer>
            <div>
                <span>
                    <section className="footer_about-us" id='aboutus'>
                        <h1 className="footer_about-us_title">What is Image Explorer ?</h1>
                        <p className="footer_about-us_description">Image Explorer is the leading image platform that allows you to browse and interact with thousands of images posted by real image enthusiasts.</p>
                    </section>
                    <section className="footer_contact" id='contacts'>
                        <h1 className="footer_contact_title">Contact us</h1>
                        <p className="footer_contact_mail">contact@imageexplorer.com</p>    
                    </section>
                </span>
                <div className="footer_me">
                    <h1>Developed By:</h1>
                    <p>NSILOU BALANDAMIO</p>
                    <img className="_me_picture" src="src/assets/nsiloub.png" alt="My Picture" />
                    <div className="_me_icons">
                        <a href="https://www.youtube.com/channel/UCDbhTsXzsanATTe3I6hAm_A" target="blank">
                            <img src="src/assets/youtube.png" alt="My Youtube Channel" />
                        </a>
                        <a href="https://www.linkedin.com/in/nsiloup/" target="blank">
                            <img src="src/assets/linkedin.png" alt="My LinkedIn Account" />
                        </a>
                        <a href="https://github.com/nsiloub">
                            <img src="src/assets/github.png" alt="My Github Account" />
                        </a>
                        <a href="https://twitter.com/nsiloubp" target="blank">
                            <img src="src/assets/twitter.png" alt="My Twitter Acount" />
                        </a>
                    </div>
                </div>
            </div>
            <p className="footer_copyright">© Copy Right Image Explorer</p>        
        </footer>
    )
};