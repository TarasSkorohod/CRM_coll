import SideBar from "../components/SideBar/SideBar";
import GroupHeader from "../components/Group/GroupHeader";
import Groups from "../components/Group/Groups";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {apiUrl} from "../utils/api/api";
import {enterGroup} from "../utils/store/slices/groupsSlice";
import Preloader from "../components/Preloader/Preloader";
import {useSearchParams} from "react-router-dom";

const AdminGroups = () => {
    const dispatch = useDispatch();
    const { renderGroupsData } = useSelector(state => state.groups);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const [searchParams] = useSearchParams();
    const activeStatus = searchParams.get('active');

    useEffect(() => {
        setIsLoading(true);

        let apiUrlWithParams = `${apiUrl}/groups`;
        if (activeStatus) {
            apiUrlWithParams += `?active=${activeStatus}`;
        }

        try {
            axios.get(apiUrlWithParams)
                .then(res => {
                    if (res.data.status === 'success') {
                        dispatch(enterGroup(res.data.data));
                        setIsLoading(false);
                    }
                })
        } catch (error) {
            console.error(error.response.data.message)
        }
    }, [renderGroupsData, dispatch, activeStatus])

    return (
        <div className="admin-container">
            <SideBar/>

            <div className="admin-wrapper">
                <div style={{margin: '50px 0 115px 45px', paddingRight: '40px', color: '#fff'}}>
                    <GroupHeader setSearch={setSearch}/>

                    {isLoading
                        ? <Preloader otherClass="group-loader" />
                        : <Groups search={search} />
                    }

                </div>
            </div>
        </div>
    );
};

export default AdminGroups;