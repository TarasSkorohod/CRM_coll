import GroupsItem from "./GroupsItem";
import './Group.css';
import {useSelector} from "react-redux";

const Groups = ({search}) => {
    const { allGroups } = useSelector(state => state.groups);

    const filteredGroups = allGroups.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ul className="admin-group__list">
            {allGroups.length === 0
                ? <li className="not-group">Групи відсутні!</li>
                : <>
                    {filteredGroups.length === 0
                        ? <li className="not-group">Групи відсутні або не відповідають критеріям пошуку!</li>
                        : filteredGroups.map((group) =>
                            <GroupsItem key={group._id} group={group}/>
                        )
                    }
                </>
            }
        </ul>
    );
};

export default Groups;