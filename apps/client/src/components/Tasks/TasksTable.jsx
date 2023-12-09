import Modal from "../Modal/Modal";
import {useState} from "react";

const TasksTable = ({data}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [dataTasks, setDataTasks] = useState(data);

    return (
        <>
            <div className="tasks-table">
                <div className="tasks-table__head">
                    <div></div>
                    <div>Назва</div>
                    <div>Всього</div>
                    <div>Новий</div>
                    <div>Заплановано</div>
                    <div>Просрочено</div>

                    <button className="tasks__edit" onClick={() => setModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                            <path
                                d="M24.4138 5.67821L18.8288 0.539052C18.643 0.368154 18.4225 0.232588 18.1799 0.140096C17.9372 0.0476051 17.6771 0 17.4144 0C17.1517 0 16.8916 0.0476051 16.6489 0.140096C16.4062 0.232588 16.1857 0.368154 16 0.539052L0.58626 14.7203C0.399734 14.8905 0.251852 15.0932 0.151209 15.3165C0.0505661 15.5397 -0.000829299 15.7792 1.01187e-05 16.0209V21.1601C1.01187e-05 21.648 0.210724 22.116 0.585796 22.4611C0.960869 22.8061 1.46958 23 2.00001 23H7.58626C7.849 23.0008 8.10929 22.9535 8.35199 22.8609C8.59469 22.7683 8.81497 22.6323 9.00001 22.4607L24.4138 8.28055C24.5995 8.1097 24.7469 7.90685 24.8474 7.68359C24.948 7.46033 24.9997 7.22104 24.9997 6.97938C24.9997 6.73772 24.948 6.49843 24.8474 6.27517C24.7469 6.05191 24.5995 5.84906 24.4138 5.67821ZM7.58626 21.1601H2.00001V16.0209L13 5.9013L18.5863 11.0404L7.58626 21.1601ZM20 9.7387L14.4138 4.6007L17.4138 1.8408L23 6.97881L20 9.7387Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>

                <ul className={`tasks-table__body ${data.length > 6 ? 'scroll' : ''}`}>
                    {
                        dataTasks.filter(({selected}) => !!selected).map(({
                                                                              all,
                                                                              fresh,
                                                                              scheduled,
                                                                              overdue,
                                                                              label,
                                                                              color
                                                                          }, index) =>
                            <li key={index}>
                                <div style={{background: `${color}`}}></div>
                                <div>{label}</div>
                                <div className={`${all !== 0 ? 'color' : ''}`} style={{textAlign: 'center'}}>{all}</div>
                                <div className={`${fresh !== 0 ? 'color' : ''}`}
                                     style={{textAlign: 'center'}}>{fresh}</div>
                                <div className={`${scheduled !== 0 ? 'color' : ''}`}
                                     style={{textAlign: 'center'}}>{scheduled}</div>
                                <div className={`${overdue !== 0 ? 'color' : ''}`}
                                     style={{textAlign: 'center'}}>{overdue}</div>
                            </li>
                        )
                    }
                </ul>

                {dataTasks.filter(({selected}) => !!selected).length === 0 ?
                    <p className="not-tasks">Задачі відсутні!</p> : null}

                <div className="tasks-table__total">
                    <div className="tasks-table__total-all">
                        Всього
                        Задач <span>{dataTasks.reduce((total, task) => task.selected ? total + task.all : total, 0)}</span>
                    </div>
                    <div className="tasks-table__total-overdue">
                        Просрочено <br/> задач <span>{dataTasks.reduce((total, task) => task.selected ? total + task.overdue : total, 0)}</span>
                    </div>
                </div>
            </div>
            {modalOpen ?
                <Modal title="Список" closeModal={setModalOpen}>
                    <ul className={`tasks__modal-list ${data.length > 7 ? 'scroll' : ''}`}>
                        {
                            dataTasks.map(({label, selected}, index) =>
                                <li key={index} className="tasks__modal-item">
                                    <button
                                        className="tasks__modal-btn"
                                        onClick={() => setDataTasks(prevData => {
                                            const updatedData = [...prevData];
                                            updatedData[index] = {
                                                ...updatedData[index],
                                                selected: !updatedData[index].selected
                                            };
                                            return updatedData;
                                        })}
                                    >
                                        {selected
                                            ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20"
                                                   viewBox="0 0 30 20" fill="none">
                                                <path
                                                    d="M29.9137 9.595C29.87 9.49625 28.8112 7.1475 26.4575 4.79375C23.3212 1.6575 19.36 0 15 0C10.64 0 6.67874 1.6575 3.54249 4.79375C1.18874 7.1475 0.124988 9.5 0.086238 9.595C0.0293795 9.72289 0 9.86129 0 10.0012C0 10.1412 0.0293795 10.2796 0.086238 10.4075C0.129988 10.5062 1.18874 12.8538 3.54249 15.2075C6.67874 18.3425 10.64 20 15 20C19.36 20 23.3212 18.3425 26.4575 15.2075C28.8112 12.8538 29.87 10.5062 29.9137 10.4075C29.9706 10.2796 30 10.1412 30 10.0012C30 9.86129 29.9706 9.72289 29.9137 9.595ZM15 18C11.1525 18 7.79124 16.6012 5.00874 13.8438C3.86704 12.7084 2.89572 11.4137 2.12499 10C2.89551 8.58617 3.86686 7.29147 5.00874 6.15625C7.79124 3.39875 11.1525 2 15 2C18.8475 2 22.2087 3.39875 24.9912 6.15625C26.1352 7.2912 27.1086 8.5859 27.8812 10C26.98 11.6825 23.0537 18 15 18ZM15 4C13.8133 4 12.6533 4.35189 11.6666 5.01118C10.6799 5.67047 9.91084 6.60754 9.45671 7.7039C9.00259 8.80026 8.88377 10.0067 9.11528 11.1705C9.34679 12.3344 9.91823 13.4035 10.7573 14.2426C11.5965 15.0818 12.6656 15.6532 13.8294 15.8847C14.9933 16.1162 16.1997 15.9974 17.2961 15.5433C18.3924 15.0892 19.3295 14.3201 19.9888 13.3334C20.6481 12.3467 21 11.1867 21 10C20.9983 8.40921 20.3657 6.88405 19.2408 5.75919C18.1159 4.63433 16.5908 4.00165 15 4ZM15 14C14.2089 14 13.4355 13.7654 12.7777 13.3259C12.1199 12.8864 11.6072 12.2616 11.3045 11.5307C11.0017 10.7998 10.9225 9.99556 11.0768 9.21964C11.2312 8.44372 11.6122 7.73098 12.1716 7.17157C12.731 6.61216 13.4437 6.2312 14.2196 6.07686C14.9956 5.92252 15.7998 6.00173 16.5307 6.30448C17.2616 6.60723 17.8863 7.11992 18.3259 7.77772C18.7654 8.43552 19 9.20887 19 10C19 11.0609 18.5786 12.0783 17.8284 12.8284C17.0783 13.5786 16.0609 14 15 14Z"
                                                    fill="white"/>
                                            </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25"
                                                   viewBox="0 0 30 25" fill="none">
                                                <path
                                                    d="M5.73999 0.336373C5.65217 0.237381 5.54558 0.156804 5.42639 0.0993108C5.3072 0.0418179 5.17778 0.0085529 5.04564 0.00144404C4.91351 -0.00566482 4.78127 0.0135237 4.6566 0.0578975C4.53193 0.102271 4.41731 0.170948 4.31938 0.259947C4.22144 0.348946 4.14215 0.456497 4.08609 0.576366C4.03003 0.696236 3.99832 0.82604 3.9928 0.958256C3.98727 1.09047 4.00804 1.22247 4.05391 1.3466C4.09978 1.47072 4.16982 1.58452 4.25999 1.68137L6.66499 4.32762C2.12499 7.11387 0.172488 11.4089 0.086238 11.6039C0.0293795 11.7318 0 11.8702 0 12.0101C0 12.1501 0.0293795 12.2885 0.086238 12.4164C0.129988 12.5151 1.18874 14.8626 3.54249 17.2164C6.67874 20.3514 10.64 22.0089 15 22.0089C17.2408 22.0216 19.4589 21.5603 21.5087 20.6551L24.2587 23.6814C24.3466 23.7804 24.4531 23.8609 24.5723 23.9184C24.6915 23.9759 24.8209 24.0092 24.9531 24.0163C25.0852 24.0234 25.2175 24.0042 25.3421 23.9598C25.4668 23.9155 25.5814 23.8468 25.6793 23.7578C25.7773 23.6688 25.8566 23.5612 25.9126 23.4414C25.9687 23.3215 26.0004 23.1917 26.0059 23.0595C26.0115 22.9273 25.9907 22.7953 25.9448 22.6712C25.899 22.547 25.8289 22.4332 25.7387 22.3364L5.73999 0.336373ZM11.6562 9.81637L16.865 15.5476C16.0806 15.9603 15.1814 16.1007 14.3085 15.9469C13.4357 15.7931 12.6386 15.3538 12.0425 14.6979C11.4464 14.042 11.085 13.2067 11.0151 12.3231C10.9452 11.4396 11.1707 10.5579 11.6562 9.81637ZM15 20.0089C11.1525 20.0089 7.79124 18.6101 5.00874 15.8526C3.86663 14.7176 2.89526 13.4229 2.12499 12.0089C2.71124 10.9101 4.58249 7.83512 8.04374 5.83637L10.2937 8.30512C9.42266 9.42075 8.97403 10.8084 9.02715 12.2228C9.08027 13.6373 9.63173 14.9874 10.584 16.0345C11.5363 17.0817 12.8282 17.7584 14.2312 17.9452C15.6343 18.132 17.0582 17.8167 18.2512 17.0551L20.0925 19.0801C18.4675 19.7036 16.7405 20.0185 15 20.0089ZM15.75 8.08012C15.4894 8.03039 15.2593 7.87919 15.1102 7.65977C14.9611 7.44036 14.9053 7.1707 14.955 6.91012C15.0047 6.64955 15.1559 6.4194 15.3753 6.27031C15.5948 6.12122 15.8644 6.06539 16.125 6.11512C17.3995 6.36221 18.56 7.01469 19.4333 7.97523C20.3067 8.93578 20.8462 10.1529 20.9712 11.4451C20.9959 11.7092 20.9147 11.9722 20.7455 12.1764C20.5762 12.3806 20.3328 12.5092 20.0687 12.5339C20.0375 12.5357 20.0062 12.5357 19.975 12.5339C19.725 12.5349 19.4838 12.4424 19.2987 12.2744C19.1136 12.1064 18.9981 11.8752 18.975 11.6264C18.8908 10.7669 18.5315 9.95748 17.9504 9.31855C17.3694 8.67963 16.5977 8.24529 15.75 8.08012ZM29.91 12.4164C29.8575 12.5339 28.5912 15.3376 25.74 17.8914C25.6426 17.9814 25.5282 18.0512 25.4036 18.0966C25.2789 18.142 25.1465 18.1621 25.014 18.1559C24.8814 18.1496 24.7515 18.117 24.6317 18.06C24.5119 18.003 24.4047 17.9228 24.3162 17.8239C24.2277 17.7251 24.1598 17.6096 24.1163 17.4843C24.0729 17.3589 24.0549 17.2262 24.0633 17.0938C24.0716 16.9614 24.1063 16.832 24.1652 16.7131C24.2241 16.5942 24.306 16.4883 24.4062 16.4014C25.8051 15.1446 26.9801 13.6593 27.8812 12.0089C27.1093 10.5936 26.1358 9.29798 24.9912 8.16262C22.2087 5.40762 18.8475 4.00887 15 4.00887C14.1893 4.00788 13.3799 4.07352 12.58 4.20512C12.4499 4.22813 12.3166 4.22513 12.1876 4.1963C12.0587 4.16748 11.9368 4.11339 11.8289 4.03718C11.721 3.96096 11.6293 3.86412 11.559 3.75225C11.4887 3.64038 11.4413 3.5157 11.4196 3.38541C11.3978 3.25512 11.402 3.1218 11.432 2.99315C11.462 2.86451 11.5172 2.74309 11.5945 2.6359C11.6717 2.52871 11.7694 2.43789 11.8819 2.36867C11.9944 2.29945 12.1195 2.25321 12.25 2.23262C13.1589 2.08254 14.0787 2.0077 15 2.00887C19.36 2.00887 23.3212 3.66637 26.4575 6.80262C28.8112 9.15637 29.87 11.5051 29.9137 11.6039C29.9706 11.7318 30 11.8702 30 12.0101C30 12.1501 29.9706 12.2885 29.9137 12.4164H29.91Z"
                                                    fill="#0E0E0E"/>
                                            </svg>
                                        }

                                    </button>
                                    {label}
                                </li>
                            )
                        }
                    </ul>
                </Modal>
                : null
            }
        </>
    );
};

export default TasksTable;