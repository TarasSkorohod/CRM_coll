import './SideBar.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "../Logout/Logout";

const SideBar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            {user.role === 'ADMIN' ?
                <div className="side-bar">
                    <svg className="side-bar__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 615.53 191.84">
                        <path className="cls-1"
                              d="M362.15,59.58c-3.89,14.61-7.85,29.2-11.59,43.85-.7,2.75-1.68,4.15-4.65,3.72-3.18-.46-7.28,1.47-8.52-3.66-1.59-6.58-3.29-13.13-4.96-19.69-2.97-11.69-5.96-23.37-8.93-35.06-.41-1.6-1.15-3.25-1.05-4.83,.12-2.01-2.94-5.07,1.46-5.93,5.64-1.1,7.39,.22,8.52,5.08,2.92,12.53,6.12,24.99,9.12,37.49,.54,2.25,.6,4.61,1.1,6.87,.24,1.11,.97,2.33,2.3,2.29,1.29-.04,1.12-1.39,1.36-2.31,4.07-15.49,8.2-30.96,12.16-46.47,.58-2.27,1.71-3.24,3.79-2.87,2.14,.38,4.97-1.59,6.21,2.17,3.01,9.1,5.2,18.4,7.68,27.64,1.97,7.31,3.09,14.92,6.34,21.82,.45-.03,.91-.06,1.36-.08,2.11-8.74,4.19-17.49,6.34-26.22,3.19-12.95,6.77-25.82,9.51-38.86,1.42-6.79,3.6-13.41,4.57-20.28,.45-3.18,1.78-4.2,4.86-4.15,8.15,.12,16.3-.02,24.45-.02,58.71,0,117.42,.05,176.12-.08,4.33,0,5.73,1.13,5.72,5.58-.12,45.08-.13,90.16,.1,135.24,.03,5.27-2.73,4.94-6.22,4.94-87.81-.03-175.63-.02-263.44-.03-17.8,0-35.59-.17-53.38,.1-4.17,.06-4.99-1.42-4.91-5.05,.99-43.07,.19-86.15,.44-129.22,0-1,.11-2.01-.04-2.99-.38-2.63-.83-4.91,3.26-4.8,3.46,.1,4.42,1.26,4.41,4.74-.13,40.26-.09,80.52-.08,120.77q0,8.89,8.99,8.91c98.46,0,196.91,0,295.37,0,.83,0,1.67-.08,2.49,0,3.95,.41,5.4-.98,5.38-5.28-.18-39.92-.2-79.85,0-119.77,.02-4.65-1.46-5.4-5.62-5.39-59.87,.12-119.75,.08-179.62,.08-1.83,0-3.66,.01-5.49-.08-2.63-.14-3.93,1.19-4.5,3.64-3.55,15.09-7.04,30.2-10.77,45.25-2.89,11.69-6.14,23.3-9.15,34.96-.99,3.84-1.92,7.71-2.58,11.61-.42,2.45-1.1,4.3-3.98,3.88-3.31-.48-7.91,1.89-9.31-3.29-3.62-13.37-6.99-26.81-10.47-40.23,.07-3.41,.05-6.79-3.09-9.25-1.65,1.67-.92,3.55-1.11,5.26Z"/>
                        <path className="cls-1"
                              d="M80.8,38.06c4.53-.89,6.96,.07,8.62,5.21,6.22,19.23,13.49,38.11,19.53,57.41,.33,1.07,1.12,1.98,1.56,3.03,.4,.94,.45,1.98-.31,2.8-2.08,2.23-12.19,.13-12.98-2.77-1.29-4.78-1.8-10.75-5.35-13.49-3.45-2.66-9.3-.58-14.09-.79-1.99-.09-3.99,.09-5.97-.05-2.46-.17-3.66,1.27-4.4,3.25-.87,2.31-1.64,4.66-2.33,7.03-2.22,7.65-2.2,7.66-10.01,7.52-4.46-.08-5.21-1.22-3.71-5.5,3.23-9.18,6.46-18.36,9.65-27.55,3.51-10.1,7.07-20.18,10.45-30.33,1.57-4.71,4.1-7.43,9.32-5.76Zm-.14,41.29c1.49,0,2.98-.06,4.46,.01,3.21,.17,4.28-1.38,3.35-4.29-2.16-6.71-5.12-13.18-6.08-20.25-.14-1.02-.87-2.02-1.87-2.06-1.25-.04-1.33,1.25-1.43,2.19-.59,5.79-3.26,10.96-4.98,16.4-2.45,7.76-2.61,7.92,5.56,8.01,.33,0,.66,0,.99-.01Z"/>
                        <path className="cls-1"
                              d="M172.36,72.05c0-9.97,.15-19.94-.08-29.9-.08-3.58,1.12-4.43,4.54-4.36,10.63,.22,21.27,.37,31.88-.03,6.59-.25,4.34,4.4,4.73,7.44,.47,3.6-2.31,3.82-4.92,3.83-6.47,.02-12.94-.02-19.41,0-3.13,.01-4.52,1.23-4.54,4.78-.07,12.48-.22,12.47,12.03,12.47,1.66,0,3.32,0,4.98,0,6.69-.02,6.52-.01,6.65,6.6,.07,3.64-1.05,5.12-4.86,4.9-4.8-.28-9.63,.06-14.44-.1-3.13-.1-4.59,.87-4.33,4.25,.25,3.14,.26,6.33,0,9.46-.31,3.64,1.31,4.53,4.64,4.45,7.14-.19,14.28-.01,21.42-.09,2.64-.03,4.68,.29,4.25,3.71-.38,3.02,1.42,7.54-3.82,7.59-11.94,.12-23.89-.25-35.84-.42-3.39-.05-2.86-2.6-2.87-4.67-.04-9.97-.02-19.93-.02-29.9Z"/>
                        <path className="cls-1"
                              d="M21.46,107.75c-6.73,.62-13.13-2.21-19.06-6.43-2.33-1.66-3.54-3.81-.9-6.07,2.28-1.95,2.62-7.81,8.06-3.98,4.82,3.39,10.17,5.3,16.33,4.58,3.44-.4,5.51-2.28,6.71-5.07,1.23-2.88,.09-5.35-2.21-7.54-4.46-4.22-10.27-5.84-15.56-8.4-7.71-3.73-13.66-8.58-13.74-18.06-.07-8.05,5.48-16.02,13.24-18.48,9.63-3.05,18.75-1.92,27.52,3.28,2.74,1.62,3.18,2.93,1.46,5.4-.84,1.21-1.45,2.59-2.04,3.94-1.06,2.43-1.98,3.22-4.77,1.38-4.2-2.77-9.17-3.68-14.28-3.26-3.5,.29-6.63,1.15-7.63,5.09-1,3.96,.7,6.9,4.06,8.75,4.19,2.31,8.42,4.61,12.86,6.36,12.61,4.98,15.22,12.44,14.05,20.42-1.79,12.26-9.15,17.95-21.33,18.08-.66,0-1.33,0-2.77,0Z"/>
                        <path className="cls-1"
                              d="M244.25,107.73c-7.01,.69-13.36-2.36-19.22-6.64-5.43-3.98,.3-6.4,1.64-9.25,1.3-2.76,3.39-2.46,5.68-.6,4.41,3.58,9.48,5.16,15.26,4.69,4.11-.33,6.67-1.75,7.64-6.16,1-4.55-1.42-7.04-4.65-8.83-4.87-2.69-10.04-4.85-15.08-7.25-8.78-4.17-12.05-10.88-11.15-20.96,.59-6.6,9.05-13.68,15.74-15.21,8.29-1.9,15.7-.25,23.04,3.01,1.83,.81,4.01,2,3.49,4.8-.59,3.19-2.07,5.95-4.53,8.01-1.17,.98-2.09-.58-2.98-1.14-4.91-3.09-10.22-3.66-15.81-2.84-3.29,.48-5.52,2.41-6.57,5.36-1.03,2.89,.88,4.67,2.93,6.67,4.2,4.08,9.63,5.84,14.68,7.95,11,4.6,15.76,11.68,13.95,23.05-1.17,7.36-10.52,16.28-20.53,15.36-.99-.09-1.99-.01-3.54-.01Z"/>
                        <path className="cls-1"
                              d="M535.99,72.08c0-9.97,.09-19.93-.05-29.9-.05-3.26,1.1-4.28,4.34-4.23,10.46,.18,20.92,.2,31.38,0,3.37-.07,4.32,1.2,4.31,4.29,0,3.07-.49,5.14-4.3,5.03-6.64-.18-13.3,.25-19.92-.18-4.98-.32-6.43,1.51-5.96,6.2,.36,3.62,.2,7.31,.04,10.95-.13,2.85,1,3.75,3.78,3.67,5.64-.17,11.31,.25,16.93-.13,4.66-.32,3.64,2.63,3.91,5.28,.34,3.41-1.7,3.91-4.25,3.93-5.48,.05-10.96,.13-16.43,.03-3.02-.05-4.14,1.22-3.98,4.18,.18,3.31,.08,6.64,.07,9.96q-.02,6.93,7.13,6.9c6.81-.03,13.62,.07,20.42-.1,3.67-.09,4.43,1.73,4.45,4.94,.02,3.31-1.36,4.32-4.51,4.28-10.96-.12-21.92-.16-32.88,.02-3.61,.06-4.61-1.42-4.57-4.73,.11-10.13,.04-20.26,.04-30.39,.02,0,.04,0,.06,0Z"/>
                        <path className="cls-1"
                              d="M462,107.14c-3.12,.39-5.32-.49-6.28-3.99-1.04-3.81-2.61-7.46-3.89-11.2-1.06-3.11-2.69-4.89-6.46-4.65-5.62,.36-11.28,.2-16.92,.07-2.71-.07-4.27,.78-5.04,3.53-1.14,4.12-2.62,8.15-3.94,12.22-1.13,3.47-6.74,5.61-9.69,3.67-1.82-1.2-1.37-2.83-.72-4.42,6.63-16.25,11.44-33.18,18.32-49.36,1.42-3.33,2.38-7.13,3.31-10.8,.76-3.01,2.55-4.62,6.1-4.28,3.15,.31,5.9-.19,7.35,3.97,6.99,20.07,14.29,40.04,21.58,60.01,1.4,3.82,.8,5.77-3.73,5.23Zm-24.73-57.52c-3.01,8.58-5.68,16.32-8.44,24.03-1.67,4.67-.93,5.79,4.13,5.81,.83,0,1.66,0,2.48,0,12.04,.07,12.32-.02,8.45-11.47-2.01-5.95-3.03-12.33-6.62-18.38Z"/>
                        <path className="cls-1"
                              d="M471.77,38.05c3.19-.61,5.02,.65,6.05,3.69,5.37,15.93,10.83,31.82,16.24,47.74,.32,.93,.32,2.12,1.62,2.14,1.82,.03,2.8-1.51,3.03-2.81,1.72-10,6.32-19.04,9.29-28.61,1.96-6.3,4.25-12.51,6.51-18.71,1.11-3.06,7.44-4.96,10.12-3.15,1.49,1.01,.8,2.32,.35,3.55-4.05,11.1-8.14,22.19-12.16,33.3-3.12,8.62-6.25,17.25-9.2,25.93-1.89,5.56-5.2,7.48-10.92,6-1.7-.44-2.25-1.6-2.81-3.1-7.65-20.68-15.44-41.3-22.99-62.01-1.87-5.12,2.5-3.59,4.86-3.95Z"/>
                        <path className="cls-1"
                              d="M120.6,72.01c0-9.3,0-18.61,0-27.91q0-6.28,6.52-6.27c.33,0,.67,.05,1,0,3.68-.62,4.81,.83,4.76,4.61-.21,15.95,.05,31.9-.18,47.84-.06,4.26,.92,5.91,5.47,5.62,6.45-.4,12.99,.33,19.42-.22,6.27-.54,4.96,3.47,5.15,6.95,.22,4.08-1.94,4.29-5.36,4.21-10.62-.25-21.26-.32-31.87,.16-4,.18-4.99-1.02-4.95-4.58,.1-10.13,.03-20.27,.03-30.4h.03Z"/>
                        <path className="cls-2"
                              d="M594.37,165.55c3.03-.34,7.3-.42,8.85,3.4,1.34,3.31,1.92,7.58-1.7,10.55-1.38,1.14-.35,2.11,.06,3.04,.8,1.79,1.73,3.52,2.69,5.23,.7,1.25,1.34,2.44-.37,3.34-1.44,.75-2.69,.18-3.43-1.05-1.27-2.11-2.27-4.38-3.5-6.52-.77-1.34-1.85-2.28-3.64-2-2.14,.33-1.91,1.94-2.01,3.4-.04,.66,0,1.33-.05,1.99-.16,1.95,.11,4.44-2.79,4.34-2.63-.1-2.22-2.45-2.24-4.21-.06-4.65-.07-9.29-.05-13.94q.03-7.63,8.18-7.58Zm.43,3.83c-3.03-.48-4.27,.99-4.29,4.19-.02,2.95,1.06,4.19,4.1,4.09,3.02-.09,5.19-.67,5.27-4.32,.07-3.56-2.11-4.05-5.08-3.96Z"/>
                        <path className="cls-1"
                              d="M511.99,165.86c2.38-.65,2.99,.78,3.01,2.69,.06,5.97,.01,11.94,.09,17.9,.03,2.13-.81,3.58-2.86,4.06-2.06,.48-2.88-1.24-3.8-2.59-2.21-3.26-4.35-6.58-6.58-9.83-.73-1.06-1.6-2.71-2.86-2.41-1.93,.45-1.09,2.48-1.14,3.84-.11,2.98,0,5.97-.04,8.96-.02,1.43-.47,2.77-2.24,2.62-1.55-.13-1.6-1.52-1.61-2.66-.03-6.81-.05-13.61,.03-20.42,.04-3.39,2.54-3.11,3.86-1.53,3.88,4.62,7.86,9.26,10.15,14.99,.25,1.28,.85,2.2,2.33,1.88,1.44-.31,1.6-1.53,1.61-2.7,.04-4.94,.04-9.88,.05-14.82Z"/>
                        <path className="cls-2"
                              d="M310.74,191.63c-7.52-.09-12.04-3.22-14.1-9.39-1.71-5.11,.7-11.52,5.66-15.07,3.14-2.24,12.94-2.5,15.63-.32,.96,.77,2.51,1.53,1.51,3.18-.9,1.47-1.9,.87-3.31,.29-5.84-2.4-10.52-1.2-13.19,3.01-2.27,3.57-1.73,8.81,1.34,11.94,3.28,3.36,7.14,3,10.98,1.29,1.59-.71,3.29-1.82,4.33,.05,1.33,2.4-1.25,3.02-2.65,3.9-2.05,1.29-4.46,1.07-6.19,1.11Z"/>
                        <path className="cls-2"
                              d="M558.21,178.58c0-.5,0-1,0-1.5-.16-12.71,.26-13.08,13.04-11.53,1.12,.14,2.54-.1,2.57,1.59,.03,1.69-1.07,2.26-2.63,2.24-1.49-.03-2.99,.04-4.48,0-2.16-.07-3.5,.64-3.49,3.08,0,2.17,.77,3.53,3.14,3.52,.83,0,1.66,.01,2.49,.05,1.4,.06,2.83,.27,2.87,2.04,.05,2.14-1.76,1.48-2.93,1.67-1.73,.27-3.74-.49-4.97,1.47-1.88,3-.14,6.18,3.48,6.36,.33,.02,.69-.05,.99,.05,2.26,.72,6.48-1.67,6.46,2.12-.02,3.08-4.12,1.72-6.34,1.7-11.09-.09-10.46,1.94-10.16-10.35,.02-.83,0-1.66,0-2.49h-.04Z"/>
                        <path className="cls-2"
                              d="M465.68,178.2c0-.83-.06-1.66,.01-2.49,.27-3.26-1.55-8,.87-9.45,3.49-2.1,8.38-.65,12.66-.63,1.01,0,2.04,.41,2.02,1.7-.02,1.15-.84,1.86-1.91,1.93-1.98,.13-3.98,.15-5.96,.1-2.13-.05-3.45,.5-3.48,3.02-.03,2.53,.94,3.73,3.48,3.6,.66-.03,1.33,.03,1.99,0,1.75-.09,3.9,.13,3.76,2.14-.15,2.11-2.16,2.35-4.22,1.99-2.6-.45-4.87-.36-5.05,3.47-.19,4.04,2.06,3.92,4.94,4.13,2.3,.17,6.46-1.7,6.48,2,.01,3.09-4.05,1.68-6.26,1.73-9.36,.2-9.37,.1-9.33-9.26,0-1.33,0-2.65,0-3.98h-.02Z"/>
                        <path className="cls-2"
                              d="M444.76,165.41c1.58,.13,3.43,.1,5.19,.48,1.64,.36,3.38,1.53,2.87,3.3-.59,2.04-2.25,2.2-4.4,1.25-5.83-2.56-10.24-.82-12.93,3.93-2.54,4.49-.13,7.57,2.24,10.68,2.62,3.43,6.33,3.08,9.99,2.08,1.08-.3,2.01-1.16,3.09-1.39,1.09-.24,2.48-.23,2.84,1.24,.26,1.08-.53,1.79-1.42,2.37-5.19,3.4-15.38,4.07-20.21-3.49-3.94-6.17-2.02-14.97,4.33-19.1,2.65-1.72,5.43-.97,8.41-1.34Z"/>
                        <path className="cls-2"
                              d="M329.24,189c2.83-4.61,3.57-10.12,5.93-14.96,1.08-2.22,1.07-4.77,2.74-6.84,.98-1.21,1.81-1.7,3.22-1.65,1.55,.06,2.36,.92,2.86,2.3,2.47,6.76,4.1,13.82,7.3,20.32,.69,1.4,.45,2.7-1.25,3.11-2.1,.5-3.2-.83-3.45-2.62-.65-4.65-3.67-5.13-7.56-4.95-3.68,.17-4.69,3.09-5.31,5.45-.56,2.15-1.6,1.62-2.76,1.68-1.16,.07-1.92-.42-1.73-1.84Zm11.91-7.85c1.29-.01,3.37,.14,2.64-1.72-.96-2.45-.65-6.76-3.14-6.95-2.51-.2-2.32,3.85-2.73,6.19-.44,2.47,1.49,2.51,3.23,2.48Z"/>
                        <path className="cls-2"
                              d="M537.24,165.55c2.65,0,5.3-.07,7.95,.03,1.07,.04,2.72-.36,2.97,1.08,.25,1.48-1.09,2.66-2.45,2.48-7.15-.93-6.57,3.78-6.4,8.38,.13,3.47,.06,6.95,.07,10.43,0,1.98-.58,4-2.79,3.88-1.8-.1-2.36-1.97-2.33-3.83,.06-4.47-.17-8.95,.05-13.41,.18-3.63-.67-5.79-4.85-5.32-1.42,.16-3.32,.3-3.35-1.88-.04-2.8,2.3-1.71,3.69-1.81,2.47-.18,4.96-.05,7.45-.05v.02Z"/>
                        <path className="cls-2"
                              d="M362.56,177.67c0-2.82,0-5.64,0-8.46,0-1.69-.08-3.53,2.31-3.6,2.62-.08,2.78,1.83,2.77,3.76,0,4.31,.16,8.63-.11,12.93-.25,4.08,1.23,5.7,5.4,5.39,2.09-.16,5.89-1.12,5.92,1.66,.05,3.52-3.82,2.05-5.99,2.06-10.39,.04-10.39-.05-10.33-10.26,0-1.16,0-2.32,0-3.48Z"/>
                        <path className="cls-2"
                              d="M398.41,191.49c-9.5-.2-9.56-.43-8.83-8.9,.39-4.46,.12-8.97,.28-13.46,.05-1.31-.71-3.3,1.64-3.49,2.44-.2,2.5,1.6,2.5,3.35,0,4.82,.17,9.65-.03,14.47-.13,3.34,1.23,4.27,4.41,4.25,2.39-.01,6.79-1.46,6.7,1.77-.1,3.69-4.56,1.42-7.05,2-.32,.07-.66,0,.38,0Z"/>
                        <path className="cls-2"
                              d="M511.99,165.86c-.01,4.94,0,9.88-.05,14.82-.01,1.17-.17,2.39-1.61,2.7-1.48,.31-2.08-.6-2.33-1.88,2.58,.2,2.31-1.71,2.35-3.28,.06-2.92-.02-5.85,.05-8.77,.03-1.37-.46-3.07,1.6-3.57Z"/>
                        <path className="cls-2"
                              d="M362.15,59.58c.18-1.7-.55-3.59,1.11-5.26,3.14,2.47,3.15,5.85,3.09,9.25-.62-1.53-1.09-3.15-1.9-4.58-1.22-2.13-1.66-.17-2.29,.58Z"/>
                    </svg>

                    <nav>
                        <ul className="side-bar__nav">
                            <li>
                                <Link to="/">
                                    <div className="side-bar__nav__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 40 38"
                                             fill="none">
                                            <path
                                                d="M23.3906 30.6162V23.7659C23.3906 23.4631 23.2609 23.1727 23.03 22.9586C22.7991 22.7445 22.486 22.6242 22.1595 22.6242H17.2351C16.9086 22.6242 16.5955 22.7445 16.3646 22.9586C16.1337 23.1727 16.004 23.4631 16.004 23.7659V30.6162C16.004 30.919 15.8743 31.2094 15.6434 31.4235C15.4126 31.6376 15.0994 31.7579 14.7729 31.7579H7.38637C7.05986 31.7579 6.74673 31.6376 6.51585 31.4235C6.28498 31.2094 6.15527 30.919 6.15527 30.6162V17.4151C6.15803 17.2571 6.19485 17.1012 6.26356 16.9566C6.33228 16.812 6.4315 16.6816 6.55538 16.5731L18.8663 6.19779C19.0933 6.00524 19.3897 5.89845 19.6973 5.89845C20.0049 5.89845 20.3014 6.00524 20.5283 6.19779L32.8392 16.5731C32.9631 16.6816 33.0623 16.812 33.1311 16.9566C33.1998 17.1012 33.2366 17.2571 33.2393 17.4151V30.6162C33.2393 30.919 33.1096 31.2094 32.8788 31.4235C32.6479 31.6376 32.3348 31.7579 32.0083 31.7579H24.6217C24.2952 31.7579 23.982 31.6376 23.7512 31.4235C23.5203 31.2094 23.3906 30.919 23.3906 30.6162Z"
                                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    Головна
                                </Link>
                            </li>
                            <li>
                                <Link to="/users">
                                    <div className="side-bar__nav__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="24" viewBox="0 0 39 24"
                                             fill="none">
                                            <path
                                                d="M17.8386 16.5349C19.5006 15.5013 20.7624 13.9956 21.4374 12.2403C22.1124 10.485 22.1648 8.57341 21.5868 6.78816C21.0089 5.00292 19.8312 3.43882 18.228 2.32715C16.6248 1.21548 14.6812 0.615265 12.6846 0.615265C10.688 0.615265 8.7444 1.21548 7.14121 2.32715C5.53802 3.43882 4.36037 5.00292 3.78239 6.78816C3.20442 8.57341 3.25682 10.485 3.93183 12.2403C4.60685 13.9956 5.86865 15.5013 7.53063 16.5349C4.52426 17.57 1.95674 19.4853 0.211201 21.9952C0.119462 22.1226 0.0557391 22.2657 0.0237378 22.4163C-0.00826355 22.5668 -0.00790526 22.7219 0.0247918 22.8723C0.0574889 23.0228 0.121872 23.1656 0.2142 23.2926C0.306528 23.4196 0.424958 23.5282 0.562606 23.6121C0.700255 23.6959 0.854376 23.7534 1.01601 23.7811C1.17765 23.8089 1.34357 23.8063 1.50414 23.7736C1.66471 23.7409 1.81672 23.6788 1.95134 23.5907C2.08596 23.5027 2.2005 23.3905 2.2883 23.2607C3.41425 21.643 4.95497 20.3137 6.77054 19.3934C8.58611 18.4732 10.619 17.9912 12.6846 17.9912C14.7502 17.9912 16.7831 18.4732 18.5987 19.3934C20.4143 20.3137 21.955 21.643 23.0809 23.2607C23.2628 23.5132 23.5438 23.6887 23.8631 23.7493C24.1824 23.8098 24.5144 23.7506 24.7873 23.5843C25.0601 23.418 25.252 23.1581 25.3214 22.8608C25.3908 22.5634 25.3321 22.2525 25.158 21.9952C23.4125 19.4853 20.845 17.57 17.8386 16.5349ZM5.86431 9.30662C5.86431 8.04654 6.26431 6.81476 7.01374 5.76704C7.76316 4.71932 8.82835 3.90273 10.0746 3.42051C11.3208 2.9383 12.6922 2.81213 14.0152 3.05796C15.3382 3.30379 16.5535 3.91058 17.5073 4.80159C18.4611 5.6926 19.1107 6.82782 19.3739 8.06368C19.637 9.29955 19.502 10.5806 18.9858 11.7447C18.4696 12.9089 17.5954 13.9039 16.4738 14.604C15.3522 15.304 14.0336 15.6777 12.6846 15.6777C10.8764 15.6758 9.14281 15.0039 7.8642 13.8095C6.58559 12.6151 5.86636 10.9957 5.86431 9.30662ZM38.4375 23.5981C38.162 23.7659 37.8265 23.8246 37.5047 23.7613C37.183 23.6981 36.9012 23.518 36.7216 23.2607C35.597 21.6421 34.0564 20.3121 32.2405 19.3923C30.4246 18.4724 28.391 17.9919 26.3252 17.9944C25.9964 17.9944 25.6809 17.8724 25.4484 17.6552C25.2158 17.4379 25.0852 17.1433 25.0852 16.8361C25.0852 16.5288 25.2158 16.2342 25.4484 16.017C25.6809 15.7997 25.9964 15.6777 26.3252 15.6777C27.3296 15.6768 28.3214 15.4687 29.2298 15.0683C30.1381 14.6678 30.9405 14.0849 31.5797 13.3612C32.2189 12.6375 32.6791 11.7908 32.9274 10.8817C33.1757 9.97257 33.206 9.02344 33.0161 8.10212C32.8262 7.1808 32.4209 6.31003 31.8289 5.55202C31.237 4.79402 30.4732 4.16749 29.592 3.71721C28.7109 3.26692 27.7341 3.004 26.7315 2.94722C25.729 2.89045 24.7254 3.04121 23.7924 3.38876C23.6403 3.45019 23.4766 3.48251 23.3108 3.48382C23.1451 3.48512 22.9808 3.45539 22.8276 3.39638C22.6744 3.33736 22.5354 3.25026 22.4189 3.14021C22.3023 3.03017 22.2106 2.89942 22.149 2.75569C22.0875 2.61196 22.0574 2.45816 22.0605 2.30339C22.0637 2.14861 22.1 1.996 22.1674 1.85456C22.2348 1.71313 22.3318 1.58574 22.4528 1.47993C22.5737 1.37412 22.7162 1.29204 22.8717 1.23852C25.0068 0.44308 27.3817 0.414455 29.5381 1.15817C31.6946 1.90188 33.4797 3.36524 34.5493 5.26593C35.6189 7.16663 35.897 9.36998 35.3301 11.4509C34.7631 13.5319 33.3913 15.343 31.4792 16.5349C34.4856 17.57 37.0531 19.4853 38.7987 21.9952C38.9783 22.2525 39.0411 22.5659 38.9734 22.8665C38.9057 23.1671 38.7129 23.4303 38.4375 23.5981Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    Користувачі
                                </Link>
                            </li>
                            <li>
                                <Link to="/groups">
                                    <div className="side-bar__nav__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="30" viewBox="0 0 23 30"
                                             fill="none">
                                            <path
                                                d="M20.7 0.387909H6.9C6.29 0.387909 5.70499 0.620904 5.27365 1.03564C4.84232 1.45037 4.6 2.01287 4.6 2.59939V4.81088H2.3C1.69 4.81088 1.10499 5.04387 0.673654 5.45861C0.242321 5.87334 3.58415e-10 6.43584 3.58413e-10 7.02237V28.0315C-5.27419e-06 28.2346 0.0582065 28.4339 0.168245 28.6073C0.278283 28.7808 0.435894 28.9217 0.623776 29.0147C0.811658 29.1077 1.02255 29.1491 1.23329 29.1343C1.44404 29.1196 1.6465 29.0494 1.81844 28.9313L9.2 23.8614L16.583 28.9313C16.7549 29.049 16.9572 29.1189 17.1678 29.1334C17.3783 29.1479 17.5889 29.1065 17.7766 29.0135C17.9642 28.9206 18.1216 28.7798 18.2316 28.6066C18.3416 28.4334 18.3998 28.2344 18.4 28.0315V22.5981L21.1816 24.5083C21.3535 24.6264 21.556 24.6967 21.7667 24.7114C21.9775 24.7261 22.1883 24.6847 22.3762 24.5917C22.5641 24.4988 22.7217 24.3578 22.8318 24.1844C22.9418 24.0109 23 23.8117 23 23.6085V2.59939C23 2.01287 22.7577 1.45037 22.3263 1.03564C21.895 0.620904 21.31 0.387909 20.7 0.387909ZM16.1 25.8836L9.867 21.5988C9.67196 21.4649 9.43825 21.3928 9.19856 21.3928C8.95887 21.3928 8.72517 21.4649 8.53012 21.5988L2.3 25.8822V7.02237H16.1V25.8836ZM20.7 21.4606L18.4 19.8766V7.02237C18.4 6.43584 18.1577 5.87334 17.7263 5.45861C17.295 5.04387 16.71 4.81088 16.1 4.81088H6.9V2.59939H20.7V21.4606Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    Групи
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">
                                    <div className="side-bar__nav__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="31" viewBox="0 0 33 31"
                                             fill="none">
                                            <path
                                                d="M16.4976 8.36964C15.0009 8.36964 13.5378 8.78125 12.2933 9.55242C11.0488 10.3236 10.0788 11.4197 9.50604 12.7021C8.93327 13.9845 8.7834 15.3956 9.0754 16.757C9.3674 18.1184 10.0881 19.369 11.1465 20.3505C12.2049 21.332 13.5533 22.0004 15.0213 22.2712C16.4892 22.542 18.0108 22.403 19.3936 21.8718C20.7765 21.3407 21.9584 20.4411 22.7899 19.287C23.6214 18.1328 24.0653 16.7759 24.0653 15.3879C24.0632 13.5271 23.2652 11.7431 21.8465 10.4274C20.4277 9.11161 18.5041 8.37157 16.4976 8.36964ZM16.4976 20.0667C15.4998 20.0667 14.5244 19.7923 13.6947 19.2781C12.8651 18.764 12.2184 18.0333 11.8366 17.1784C11.4547 16.3234 11.3548 15.3827 11.5495 14.4751C11.7441 13.5675 12.2246 12.7338 12.9302 12.0794C13.6358 11.4251 14.5347 10.9795 15.5134 10.7989C16.492 10.6184 17.5064 10.7111 18.4283 11.0652C19.3502 11.4193 20.1381 12.019 20.6925 12.7884C21.2468 13.5579 21.5427 14.4625 21.5427 15.3879C21.5427 16.6288 21.0112 17.8188 20.0651 18.6963C19.1189 19.5737 17.8357 20.0667 16.4976 20.0667ZM30.3717 15.7037C30.378 15.4931 30.378 15.2826 30.3717 15.072L32.7239 12.3466C32.8473 12.2035 32.9326 12.0356 32.9732 11.8563C33.0137 11.677 33.0082 11.4914 32.9573 11.3144C32.5716 9.97009 31.9948 8.67939 31.2419 7.47628C31.1434 7.31883 31.0065 7.1849 30.8423 7.08514C30.6781 6.98539 30.491 6.92256 30.296 6.90166L26.5563 6.51566C26.4007 6.3636 26.2431 6.21738 26.0833 6.07702L25.6419 2.60008C25.6192 2.41908 25.5512 2.24551 25.4433 2.0932C25.3355 1.94089 25.1908 1.81405 25.0207 1.7228C23.7229 1.02587 22.3313 0.491446 20.8821 0.133466C20.6912 0.0863812 20.491 0.0815654 20.2976 0.119407C20.1043 0.157248 19.9232 0.236688 19.7691 0.351323L16.8382 2.52112C16.6112 2.52112 16.3841 2.52112 16.1571 2.52112L13.2183 0.344013C13.064 0.229628 12.8829 0.150453 12.6896 0.112867C12.4962 0.0752801 12.2961 0.0803326 12.1052 0.127618C10.656 0.485879 9.26431 1.02081 7.96669 1.71841C7.79692 1.80983 7.65251 1.93675 7.54494 2.08905C7.43737 2.24135 7.36963 2.41483 7.34709 2.59569L6.93087 6.06971C6.76691 6.21495 6.60925 6.36116 6.45789 6.50835L2.70876 6.90751C2.51359 6.92857 2.32643 6.99162 2.1622 7.09163C1.99797 7.19165 1.8612 7.32587 1.7628 7.48359C1.01131 8.68716 0.435049 9.97775 0.0490449 11.3217C-0.00172627 11.4988 -0.0069191 11.6845 0.0338848 11.8638C0.0746888 12.0431 0.160348 12.211 0.283957 12.3539L2.62362 15.072C2.62362 15.2826 2.62362 15.4931 2.62362 15.7037L0.276074 18.4291C0.152735 18.5722 0.0673616 18.7401 0.0268325 18.9194C-0.0136965 19.0987 -0.00824839 19.2844 0.0427384 19.4613C0.428356 20.8056 1.0052 22.0963 1.75807 23.2994C1.85665 23.4569 1.9935 23.5908 2.15772 23.6906C2.32194 23.7903 2.50901 23.8532 2.70403 23.8741L6.44371 24.2601C6.60031 24.4121 6.75797 24.5583 6.91668 24.6987L7.3534 28.1756C7.3761 28.3566 7.44409 28.5302 7.55194 28.6825C7.65979 28.8348 7.80451 28.9617 7.97458 29.0529C9.27237 29.7498 10.664 30.2843 12.1131 30.6422C12.3041 30.6893 12.5043 30.6941 12.6977 30.6563C12.891 30.6185 13.072 30.539 13.2262 30.4244L16.1571 28.2546C16.3841 28.2604 16.6112 28.2604 16.8382 28.2546L19.7769 30.4361C19.9312 30.5505 20.1124 30.6296 20.3057 30.6672C20.499 30.7048 20.6992 30.6998 20.89 30.6525C22.3395 30.2949 23.7313 29.7599 25.0286 29.0617C25.1983 28.9703 25.3428 28.8434 25.4503 28.691C25.5579 28.5387 25.6256 28.3653 25.6482 28.1844L26.0644 24.7162C26.2284 24.572 26.386 24.4258 26.5374 24.2776L30.2865 23.8682C30.4817 23.8471 30.6688 23.7841 30.8331 23.6841C30.9973 23.5841 31.1341 23.4498 31.2325 23.2921C31.984 22.0886 32.5602 20.798 32.9462 19.454C32.997 19.2769 33.0022 19.0913 32.9614 18.9119C32.9206 18.7326 32.8349 18.5647 32.7113 18.4218L30.3717 15.7037ZM27.8333 14.7533C27.8601 15.176 27.8601 15.5997 27.8333 16.0224C27.8146 16.3118 27.9123 16.5973 28.1077 16.8237L30.3448 19.416C30.0881 20.1726 29.7594 20.9066 29.3626 21.6092L25.7995 21.9835C25.4892 22.0155 25.2027 22.153 24.9955 22.3695C24.692 22.6861 24.3688 22.9858 24.0274 23.2673C23.794 23.4595 23.6457 23.7252 23.6112 24.013L23.2155 27.3144C22.4579 27.6826 21.6665 27.9875 20.8506 28.2253L18.0537 26.1506C17.8299 25.9847 17.5519 25.8945 17.2654 25.8947H17.1898C16.734 25.9196 16.277 25.9196 15.8213 25.8947C15.5092 25.8773 15.2014 25.968 14.9573 26.1491L12.1541 28.2253C11.3383 27.9873 10.5469 27.6824 9.78923 27.3144L9.38563 24.0144C9.35118 23.7266 9.20288 23.461 8.96941 23.2687C8.62809 22.9873 8.30486 22.6875 8.00138 22.371C7.79411 22.1545 7.50761 22.0169 7.19732 21.985L3.63737 21.6165C3.24037 20.914 2.91167 20.18 2.65515 19.4233L4.89234 16.8295C5.08769 16.6032 5.18545 16.3176 5.16667 16.0283C5.13986 15.6056 5.13986 15.1818 5.16667 14.7591C5.18545 14.4698 5.08769 14.1842 4.89234 13.9579L2.65515 11.3597C2.91186 10.6031 3.24056 9.86914 3.63737 9.1665L7.19574 8.79219C7.50604 8.76025 7.79253 8.62271 7.9998 8.40619C8.30328 8.08965 8.62651 7.78989 8.96783 7.50844C9.20223 7.3161 9.35115 7.04979 9.38563 6.7613L9.78135 3.46127C10.5389 3.0931 11.3303 2.78825 12.1462 2.55037L14.9431 4.62513C15.1872 4.80629 15.4951 4.89696 15.8071 4.87954C16.2629 4.85468 16.7198 4.85468 17.1756 4.87954C17.4876 4.89696 17.7955 4.80629 18.0395 4.62513L20.8411 2.55037C21.657 2.78844 22.4484 3.09327 23.206 3.46127L23.6096 6.7613C23.6441 7.04906 23.7924 7.31476 24.0259 7.50698C24.3672 7.78843 24.6904 8.08819 24.9939 8.40473C25.2012 8.62125 25.4877 8.75879 25.798 8.79073L29.3579 9.15773C29.7549 9.86028 30.0836 10.5942 30.3401 11.3509L28.1029 13.9447C27.9057 14.173 27.8078 14.4614 27.8286 14.7533H27.8333Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    Налаштування
                                </Link>
                            </li>
                            <li>
                                <Link to="/operator">
                                    <div className="side-bar__nav__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30"
                                             fill="none">
                                            <path
                                                d="M0 3C0 1.34314 1.3036 0 2.9117 0H28.1464C29.7544 0 31.0581 1.34314 31.0581 3V9.81173C30.7832 9.68629 30.0369 9.39501 29.117 9.44009V3C29.117 2.44772 28.6823 2 28.1464 2H2.9117C2.37567 2 1.94113 2.44772 1.94113 3V21C1.94113 21.5522 2.37567 22 2.9117 22H7.76452V19C7.76452 17.3432 9.06813 16 10.6762 16H20.3819C21.9899 16 23.2936 17.3432 23.2936 19V21.1484C21.2816 21.2144 20.3178 22.7274 19.7485 23.6208C19.6557 23.7668 19.5732 23.8962 19.4985 24H2.9117C1.3036 24 0 22.6568 0 21V3Z"
                                                fill="white"/>
                                            <path
                                                d="M20.3814 8.99902C20.3814 11.7604 18.2087 13.999 15.5286 13.999C12.8485 13.999 10.6758 11.7604 10.6758 8.99902C10.6758 6.2376 12.8485 3.99902 15.5286 3.99902C18.2087 3.99902 20.3814 6.2376 20.3814 8.99902Z"
                                                fill="white"/>
                                            <path
                                                d="M26.8555 14.5298L27.6304 12.6472C27.9938 11.7644 28.8642 11.2841 29.7179 11.4674L29.9004 11.5169L30.8706 11.8363C31.8328 12.153 32.5695 13.0022 32.8074 14.0686C33.3729 16.6026 32.6945 19.6878 30.7722 23.3244C28.8528 26.9554 26.749 29.1388 24.461 29.8742C23.5725 30.1596 22.6181 29.9522 21.9 29.3312L21.7104 29.1516L20.9735 28.3894C20.3349 27.7288 20.2033 26.6838 20.6315 25.8662L20.7404 25.6818L21.8509 24.0006C22.2881 23.339 23.0356 23.026 23.756 23.1842L23.9514 23.239L26.0018 23.9436C26.82 23.3056 27.5023 22.5026 28.0486 21.5346C28.517 20.7048 28.8231 19.8638 28.9675 19.0114L29.0261 18.5844L27.3189 16.9148C26.7565 16.3648 26.5521 15.5084 26.7822 14.7376L26.8555 14.5298Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    Дзвінки
                                </Link>
                            </li>
                            <li>
                                <Logout />
                            </li>
                        </ul>
                    </nav>

                    <div className="side-bar__developers">
                        Designed by
                        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="28" viewBox="0 0 85 28" fill="none">
                            <path
                                d="M28.6592 3.31036H32.0218C32.8807 3.31036 33.6108 3.61014 34.2119 4.20971C34.8046 4.80927 35.1009 5.5455 35.1009 6.41838C35.1009 7.29129 34.8046 8.02753 34.2119 8.62703C33.6108 9.22666 32.8807 9.52634 32.0218 9.52634H30.4371V11.9797H28.6592V3.31036ZM30.4371 7.82032H32.0218C32.3996 7.82032 32.7132 7.688 32.9622 7.42348C33.2113 7.15024 33.3359 6.81513 33.3359 6.41838C33.3359 6.0128 33.2113 5.67775 32.9622 5.41324C32.7132 5.14872 32.3996 5.01647 32.0218 5.01647H30.4371V7.82032Z"
                                fill="white"/>
                            <path
                                d="M37.7988 3.31036H41.1614C42.0203 3.31036 42.7503 3.61014 43.3515 4.20971C43.9442 4.80927 44.2405 5.5455 44.2405 6.41838C44.2405 7.29129 43.9442 8.02754 43.3515 8.62703C42.7503 9.22666 42.0203 9.52634 41.1614 9.52634H39.5767V15.0819H37.7988V3.31036ZM39.5767 7.82032H41.1614C41.5393 7.82032 41.8528 7.688 42.1019 7.42348C42.3509 7.15024 42.4754 6.81513 42.4754 6.41838C42.4754 6.0128 42.3509 5.67775 42.1019 5.41324C41.8528 5.14872 41.5393 5.01647 41.1614 5.01647H39.5767V7.82032Z"
                                fill="white"/>
                            <path
                                d="M47.4443 3.31036H50.8069C51.6658 3.31036 52.3959 3.61014 52.997 4.20971C53.5897 4.80927 53.886 5.5455 53.886 6.41838C53.886 7.29129 53.5897 8.02753 52.997 8.62703C52.3959 9.22666 51.6658 9.52634 50.8069 9.52634H49.2222V11.9797H47.4443V3.31036ZM49.2222 7.82032H50.8069C51.1848 7.82032 51.4983 7.688 51.7474 7.42348C51.9964 7.15024 52.1211 6.81513 52.1211 6.41838C52.1211 6.0128 51.9964 5.67775 51.7474 5.41324C51.4983 5.14872 51.1848 5.01647 50.8069 5.01647H49.2222V7.82032Z"
                                fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M28.6592 24.5643V12.866H30.4371V24.5643H28.6592ZM47.4461 17.2125V12.866H49.22V24.5643H47.4461V23.3304C46.8174 24.3015 45.9155 24.7871 44.7406 24.7871C43.6789 24.7871 42.7719 24.3529 42.0196 23.4846C41.2671 22.6164 40.8909 21.5482 40.8909 20.28C40.8909 19.0119 41.2671 17.9436 42.0196 17.0753C42.7719 16.207 43.6789 15.7729 44.7406 15.7729C45.9155 15.7729 46.8174 16.2527 47.4461 17.2125ZM43.2564 22.2507C43.7202 22.7649 44.3025 23.022 45.0034 23.022C45.7043 23.022 46.2866 22.7649 46.7504 22.2507C47.2141 21.7252 47.4461 21.0682 47.4461 20.28C47.4461 19.4917 47.2141 18.8405 46.7504 18.3263C46.2866 17.8008 45.7043 17.5381 45.0034 17.5381C44.3025 17.5381 43.7202 17.8008 43.2564 18.3263C42.7925 18.8405 42.5607 19.4917 42.5607 20.28C42.5607 21.0569 42.7925 21.7138 43.2564 22.2507ZM56.1422 15.9956V20.5884C56.1422 21.3996 55.967 22.0165 55.6165 22.4393C55.2661 22.8506 54.7868 23.0562 54.1787 23.0562C53.6427 23.0562 53.2202 22.8848 52.911 22.542C52.6018 22.1994 52.4471 21.7081 52.4471 21.0682V15.9956H50.7775V21.2568C50.7775 22.3421 51.0454 23.2047 51.5814 23.8446C52.1277 24.4728 52.8492 24.7871 53.7457 24.7871C54.828 24.7871 55.6268 24.3472 56.1422 23.4675V24.5643H57.8119V15.9956H56.1422ZM61.8188 18.3607C61.8188 18.6234 61.9424 18.8405 62.1899 19.0119C62.4371 19.1718 62.7979 19.326 63.272 19.4745C63.6327 19.5659 63.9471 19.6631 64.2151 19.7658C64.483 19.8687 64.7665 20.0229 65.0655 20.2286C65.3643 20.4228 65.5911 20.6856 65.7457 21.0169C65.9106 21.3368 65.9878 21.7138 65.9776 22.1479C65.9776 22.9705 65.689 23.616 65.1118 24.0845C64.5346 24.5528 63.8183 24.7871 62.9628 24.7871C62.2001 24.7871 61.5456 24.61 60.9993 24.2557C60.4531 23.9016 60.0562 23.4103 59.8089 22.7819L61.2467 21.8566C61.5044 22.6792 62.0765 23.0905 62.9628 23.0905C63.8389 23.0905 64.277 22.7706 64.277 22.1307C64.277 21.6624 63.7873 21.2968 62.8082 21.034C62.4371 20.9312 62.1228 20.8283 61.8651 20.7256C61.6178 20.6227 61.3395 20.4742 61.0303 20.28C60.7313 20.0857 60.4995 19.8287 60.3346 19.5087C60.18 19.1889 60.1078 18.8176 60.118 18.3949C60.118 17.6066 60.3861 16.9724 60.9221 16.4926C61.4684 16.0128 62.1435 15.7729 62.9474 15.7729C63.5864 15.7729 64.1533 15.9329 64.648 16.2527C65.1531 16.5611 65.5395 16.9954 65.8075 17.5551L64.4006 18.4292C64.143 17.778 63.6585 17.4524 62.9474 17.4524C62.6175 17.4524 62.3443 17.5323 62.1279 17.6923C61.9218 17.8522 61.8188 18.0749 61.8188 18.3607ZM70.9867 17.778V15.9956H69.0696V13.5965L67.4 14.1449V15.9956H65.9776V17.778H67.4V21.8908C67.4 23.0105 67.6782 23.7817 68.2347 24.2044C68.7914 24.6157 69.7087 24.7357 70.9867 24.5643V22.902C70.5642 22.9248 70.2086 22.9305 69.9199 22.9191C69.6417 22.8963 69.4304 22.8106 69.2861 22.662C69.1418 22.5021 69.0696 22.2451 69.0696 21.8908V17.778H70.9867ZM74.2463 15.9956V17.4352C74.6688 16.3727 75.4625 15.8414 76.6271 15.8414V17.8465C75.9984 17.8008 75.4419 17.9722 74.9575 18.3607C74.4834 18.7376 74.2463 19.366 74.2463 20.2456V24.5643H72.5766V15.9956H74.2463ZM83.2219 15.9956L81.2431 22.2164L78.9395 15.9956H77.1151L80.3927 24.4101L80.3155 24.5815C80.0989 25.187 79.831 25.6268 79.5114 25.9009C79.192 26.1752 78.7745 26.2952 78.2592 26.2608V27.9917C80.0321 28.1059 81.2895 27.0549 82.0316 24.8384L84.9999 15.9956H83.2219ZM33.2621 16.7077C33.798 16.0679 34.5143 15.7481 35.411 15.7481C36.4933 15.7481 37.292 16.1879 37.8073 17.0676V15.9682H39.5748V24.5394H37.8073V19.9466C37.8073 19.1355 37.6321 18.5243 37.2817 18.113C36.9312 17.6902 36.452 17.4789 35.8439 17.4789C35.308 17.4789 34.8853 17.6502 34.5761 17.993C34.267 18.3358 34.1124 18.8271 34.1124 19.4668V24.5394H32.4426V19.2783C32.4426 18.1929 32.7158 17.3361 33.2621 16.7077Z"
                                  fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.00775666 18.5528L1.1036 16.5972C1.11479 16.5755 1.13838 16.5608 1.1621 16.5604L14.4648 16.5634C14.4878 16.5629 14.5132 16.5794 14.5255 16.5995L16.1416 19.482C16.1687 19.5263 16.1388 19.5842 16.088 19.5856L0.619724 19.58C0.596905 19.5807 0.575388 19.5691 0.562898 19.5494L0.0106985 18.6217C-0.00242668 18.601 -0.00355559 18.5746 0.00775666 18.5528ZM16.9333 20.8922L17.8222 22.4768C17.8299 22.4894 17.8335 22.5042 17.8323 22.519L17.7854 23.3156C17.784 23.3327 17.7763 23.3485 17.7641 23.36L16.5686 24.5943C16.5566 24.6055 16.5409 24.6117 16.5246 24.6119L8.50387 24.6076C8.49177 24.6076 8.4799 24.6042 8.46957 24.5977L6.37988 23.2502C6.36809 23.2429 6.35887 23.2319 6.35352 23.2187L5.44183 20.9513C5.42394 20.9075 5.45466 20.8587 5.50093 20.8577L16.8767 20.8611C16.8996 20.8606 16.9211 20.8724 16.9333 20.8922Z"
                                  fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M17.2444 0.031909L18.3405 1.98747C18.353 2.00821 18.3537 2.03661 18.3421 2.05802L11.6882 13.925C11.6772 13.9457 11.6506 13.96 11.6276 13.9611L8.39639 13.9616C8.34557 13.9637 8.31188 13.9081 8.33607 13.862L16.0749 0.0642604C16.0858 0.0435782 16.1062 0.0301767 16.129 0.0288743L17.185 0.000104069C17.209 -0.00126345 17.2318 0.0109273 17.2444 0.031909ZM6.81496 13.9629L5.03847 13.9635C5.02406 13.9642 5.00983 13.96 4.99799 13.9516L4.3518 13.5113C4.33818 13.5016 4.32865 13.4869 4.32515 13.4702L3.88526 11.7864C3.88184 11.77 3.88443 11.753 3.89256 11.7384L7.90647 4.58459C7.91251 4.57378 7.92133 4.56491 7.93196 4.55894L10.1095 3.36826C10.1216 3.36145 10.1355 3.35875 10.1492 3.36055L12.5111 3.68081C12.5569 3.68683 12.5825 3.73859 12.5602 3.78038L6.86951 13.9279C6.85848 13.9486 6.83781 13.9618 6.81496 13.9629Z"
                                  fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M24.2943 24.4642L22.1022 24.4644C22.0786 24.4652 22.0544 24.4515 22.042 24.4306L15.3933 12.5607C15.3814 12.5404 15.3825 12.5095 15.3933 12.4885L17.0084 9.60539C17.0321 9.55902 17.0957 9.55681 17.1223 9.60135L24.8518 23.4046C24.8638 23.4247 24.8648 23.4497 24.8544 23.4706L24.3506 24.4273C24.3398 24.4493 24.3181 24.4635 24.2943 24.4642ZM17.7981 8.19384L18.6858 6.60856C18.6924 6.59527 18.703 6.58473 18.7161 6.57847L19.4092 6.22201C19.4242 6.21473 19.4413 6.21358 19.4571 6.21881L21.0925 6.66821C21.1079 6.67329 21.1211 6.68423 21.1292 6.69869L25.136 13.8568C25.142 13.8676 25.1451 13.8799 25.1448 13.8924L25.057 16.4305C25.0567 16.4447 25.052 16.4584 25.0437 16.4697L23.5935 18.4168C23.5654 18.4547 23.5092 18.4517 23.4852 18.4109L17.8002 8.26001C17.7883 8.23982 17.7876 8.21468 17.7981 8.19384Z"
                                  fill="white"/>
                        </svg>
                    </div>
                </div>
                : null}
        </>
    );
};

export default SideBar;