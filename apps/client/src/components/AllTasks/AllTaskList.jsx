import CustomCheckBoxArrow from "../UI/CustomCheckBoxArrow";
import {IconTypeCall} from "../../utils/IconTypeCall";

const AllTaskList = ({data, allChecked, renderCheckBox, setAdvancedViewVisibility, advancedViewVisibility}) => {
    return (
        <ul className="tasks-table__list">
            {
                data.map((item, index) =>
                    <li key={index}>
                        <CustomCheckBoxArrow className="tasks-table__chkbox" checkedState={allChecked}
                                             render={renderCheckBox}/>
                        <div className="tasks-table__item-wrapper"
                             onClick={() => setAdvancedViewVisibility({[index]: true})}>
                            <div style={{minWidth: '40px', maxWidth: '40px'}}>{index + 1}</div>
                            <div style={{minWidth: '66px', maxWidth: '66px'}}>
                                {item.article}
                            </div>
                            <div style={{minWidth: '120px', maxWidth: '120px'}}>
                                {item.created}
                            </div>
                            <div style={{minWidth: '203px', maxWidth: '203px', fontSize: '16px'}}>
                                {item.name}
                            </div>
                            <div style={{minWidth: '91px', maxWidth: '91px'}}>
                                {item.group}
                            </div>
                            <div style={{minWidth: '134px', maxWidth: '134px', fontSize: '18px'}}>
                                {item.phone}
                            </div>
                            <div style={{minWidth: '94px', maxWidth: '94px'}}>
                                {item.attempts}
                            </div>
                            <div style={{minWidth: '161px', maxWidth: '161px'}}>
                                {item.scheduledCall}
                            </div>
                            <div style={{
                                minWidth: '112px',
                                maxWidth: '112px',
                                fontSize: '18px',
                                color: `${item.status.type === "active" ? '#0E0E0E' : '#FC2828'}`
                            }}>
                                {item.status.value}
                            </div>
                        </div>
                        {advancedViewVisibility[index] ?
                            <div className="tasks-table__advanced-view advanced-view">
                                <div className="advanced-view__head">
                                    Поглибшений перегляд
                                    <svg onClick={() => setAdvancedViewVisibility({[index]: false})}
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="0.971374"/>
                                        <path
                                            d="M17.1068 16.3623C17.1557 16.4112 17.1945 16.4692 17.2209 16.5331C17.2474 16.5969 17.261 16.6654 17.261 16.7345C17.261 16.8036 17.2474 16.8721 17.2209 16.9359C17.1945 16.9998 17.1557 17.0578 17.1068 17.1067C17.0579 17.1556 16.9999 17.1943 16.936 17.2208C16.8722 17.2472 16.8037 17.2609 16.7346 17.2609C16.6655 17.2609 16.5971 17.2472 16.5332 17.2208C16.4693 17.1943 16.4113 17.1556 16.3624 17.1067L12.0001 12.7437L7.63768 17.1067C7.53897 17.2054 7.40509 17.2609 7.26549 17.2609C7.12589 17.2609 6.99201 17.2054 6.8933 17.1067C6.79459 17.008 6.73914 16.8741 6.73914 16.7345C6.73914 16.5949 6.79459 16.461 6.8933 16.3623L11.2563 11.9999L6.8933 7.63756C6.79459 7.53885 6.73914 7.40497 6.73914 7.26537C6.73914 7.12577 6.79459 6.99189 6.8933 6.89318C6.99201 6.79447 7.12589 6.73901 7.26549 6.73901C7.40509 6.73901 7.53897 6.79447 7.63768 6.89318L12.0001 11.2562L16.3624 6.89318C16.4611 6.79447 16.595 6.73901 16.7346 6.73901C16.8742 6.73901 17.0081 6.79447 17.1068 6.89318C17.2055 6.99189 17.261 7.12577 17.261 7.26537C17.261 7.40497 17.2055 7.53885 17.1068 7.63756L12.7438 11.9999L17.1068 16.3623Z"
                                            fill="white"/>
                                    </svg>
                                </div>

                                <div className="advanced-view__buttons">
                                    <button style={{background: "#FC2828"}}>Видалити</button>
                                    <button style={{background: "#EDDA2B"}}>Преенести задачу</button>
                                    <button style={{background: "#24CFDA"}}>підняти задачу</button>
                                    <button style={{background: "#FFF", color: "#0E0E0E"}}>CRM</button>
                                </div>

                                <ul className="advanced-view__content">
                                    <li>
                                        <div className="advanced-view__content-title">Кількість дзвінків</div>
                                        <p style={{color: "#46DA2E"}}>{item.numberCalls}</p>
                                    </li>
                                    <li>
                                        <div className="advanced-view__content-title">Оператори</div>
                                        {item.operators.map(({operator}, idx) =>
                                            <p style={{color: "#24CFDA"}} key={idx}>{operator}</p>
                                        )}

                                    </li>
                                    <li>
                                        <div className="advanced-view__content-title">Час очікування дзвінка</div>
                                        <p style={{color: "#EDDA2B"}}>{item.waitingTime}</p>
                                    </li>
                                    <li>
                                        <div className="advanced-view__content-title">Час дзвінка</div>
                                        <p style={{color: "#EDDA2B"}}>{item.callTime}</p>
                                    </li>
                                    <li>
                                        <div className="advanced-view__content-title">Тип дзвінка</div>
                                        <p style={{color: "#FC2828"}}>{IconTypeCall(item.type)}</p>
                                    </li>
                                    <li>
                                        <div className="advanced-view__content-title">Хто положив слухавку</div>
                                        <p style={{color: "#FC2828"}}>{item.hungUp}</p>
                                    </li>
                                </ul>
                            </div>
                            : null
                        }
                    </li>
                )
            }
        </ul>
    );
};

export default AllTaskList;