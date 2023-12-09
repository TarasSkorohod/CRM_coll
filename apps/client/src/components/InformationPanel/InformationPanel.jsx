import './InformationPanel.css';
import {IconTypeCall} from "../../utils/IconTypeCall";

const InformationPanel = () => {

    const data = [
        {
            name: "Мельник Андрій",
            time: "16:13",
            status: {
                name: "Виклик",
                color: "#FC2828"
            },
            group: "Prom",
            type: "manual-dialing"
        },
        {
            name: "Карабчевский Давид",
            time: "36:54",
            status: {
                name: "У розмові",
                color: "#FC2828"
            },
            group: "OLX",
            type: "incoming-call"
        },
        {
            name: "Куцька Степан",
            time: "41:02",
            status: {
                name: "Відпочиваю",
                color: "#24CFDA"
            },
            group: "Rozetka",
            type: "automatic call"
        },
        {
            name: "Ернех Стас",
            time: "21:35",
            status: {
                name: "Постобробка",
                color: "#EDDA2B"
            },
            group: "Hotprice",
            type: "manual-dialing"
        },
        {
            name: "Зухвала Наталя",
            time: "29:52",
            status: {
                name: "Готовий",
                color: "#46DA2E"
            },
            group: "Hotprice",
            type: "automatic call"
        },
        {
            name: "Мельник Андрій",
            time: "16:13",
            status: {
                name: "Виклик",
                color: "#FC2828"
            },
            group: "Prom",
            type: "manual-dialing"
        },
        {
            name: "Карабчевский Давид",
            time: "36:54",
            status: {
                name: "У розмові",
                color: "#FC2828"
            },
            group: "OLX",
            type: "incoming-call"
        },
        {
            name: "Куцька Степан",
            time: "41:02",
            status: {
                name: "Відпочиваю",
                color: "#24CFDA"
            },
            group: "Rozetka",
            type: "automatic call"
        },
        {
            name: "Ернех Стас",
            time: "21:35",
            status: {
                name: "Постобробка",
                color: "#EDDA2B"
            },
            group: "Hotprice",
            type: "manual-dialing"
        },
        {
            name: "Зухвала Наталя",
            time: "29:52",
            status: {
                name: "Готовий",
                color: "#46DA2E"
            },
            group: "Hotprice",
            type: "automatic call"
        },
        {
            name: "Мельник Андрій",
            time: "16:13",
            status: {
                name: "Виклик",
                color: "#FC2828"
            },
            group: "Prom",
            type: "manual-dialing"
        },
        {
            name: "Карабчевский Давид",
            time: "36:54",
            status: {
                name: "У розмові",
                color: "#FC2828"
            },
            group: "OLX",
            type: "incoming-call"
        },
        {
            name: "Куцька Степан",
            time: "41:02",
            status: {
                name: "Відпочиваю",
                color: "#24CFDA"
            },
            group: "Rozetka",
            type: "automatic call"
        },
        {
            name: "Ернех Стас",
            time: "21:35",
            status: {
                name: "Постобробка",
                color: "#EDDA2B"
            },
            group: "Hotprice",
            type: "manual-dialing"
        },
        {
            name: "Зухвала Наталя",
            time: "29:52",
            status: {
                name: "Готовий",
                color: "#46DA2E"
            },
            group: "Hotprice",
            type: "automatic call"
        }
    ]

    return (
        <div className={`information-panel ${data.length > 11 ? 'scroll' : ''}`}>
            <ul className="information-panel__head">
                <li>Ім’я оператора</li>
                <li>Час в статусі</li>
                <li>Статус</li>
                <li>Група</li>
                <li>Тип</li>
            </ul>
            <ul className="information-panel__body">
                {
                    data.map(({name, time, status, group, type}, index) =>
                        <li key={index}>
                            <div>{name}</div>
                            <div>{time}</div>
                            <div className="information-panel__status"
                                 style={{background: `${status.color}`}}>{status.name}</div>
                            <div>{group}</div>
                            <div>{IconTypeCall(type)}</div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default InformationPanel;