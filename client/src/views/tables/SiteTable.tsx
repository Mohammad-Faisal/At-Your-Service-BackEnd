import React, {FC, useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {selectSites} from "../../store/site/SiteSelector";
// import {SiteAction} from "../../store/site/SiteAction";
// import {Table} from "antd";
// import {ModalEditForm, Site} from "../modals/ModalEditForm";
// import {GetSitesRequest} from "../../store/site/request-models/GetSitesRequest";
// import {selectLoggedInState} from "../../store/user/UserSelector";
// import {selectFinished} from "../../store/misc/finished/FinishedSelector";
// import {ModalCreateForm} from "../modals/ModalCreateForm";
// import {PageTopContainer} from "../common-components/layout/FormStyles";

export const SiteTable: FC = () => {

    return <div></div>

    // const dispatch = useDispatch();
    // const tableData = useSelector(selectSites);
    // const isSignedIn = useSelector(selectLoggedInState);
    //
    // const isFinishedCreate = useSelector(state => selectFinished(state,[SiteAction.CREATE_SITE]))
    // const isFinishedUpdate = useSelector(state => selectFinished(state,[SiteAction.UPDATE_SITE]))
    //
    // useEffect(() => {
    //     if(isSignedIn)dispatch(SiteAction.getSites(new GetSitesRequest()))
    // },[dispatch,isSignedIn,isFinishedCreate,isFinishedUpdate])
    //
    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: 'Description',
    //         dataIndex: 'description',
    //     },
    //     {
    //         title: 'Region',
    //         dataIndex: 'region',
    //     },
    //     {
    //         title: 'Latitude',
    //         dataIndex: 'lat',
    //     },
    //     {
    //         title: 'Longitude',
    //         dataIndex: 'lng',
    //     },
    //     {
    //         title: 'Edit',
    //         render: (text:string ,record : Site )=> <ModalEditForm siteData={record}/>
    //     },
    // ];
    //
    // return<div style={{margin:"20px"}}>
    //
    //     <PageTopContainer>
    //         <h2 style={{textAlign:"start"}}>Site Data</h2>
    //         <ModalCreateForm />
    //     </PageTopContainer>
    //
    //     <Table dataSource={tableData} columns={columns} />
    // </div>
}