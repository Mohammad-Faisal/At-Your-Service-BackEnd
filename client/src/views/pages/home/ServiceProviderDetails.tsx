import styled from 'styled-components';
import { Rate, Tabs, Tag } from 'antd';
import { ServiceTypeTag } from './IndividualService';
import React from 'react';

const { TabPane } = Tabs;

export const ServiceProviderDetails = ({ details }) => {
    if (!details) return <div> Details not found!</div>;
    return (
        <div>
            <ServiceProviderName>{details.serviceProviderName}</ServiceProviderName>
            <ServiceProviderRating> Rating: {details.averageRating}</ServiceProviderRating>
            <Tabs defaultActiveKey="services" centered>
                <TabPane tab="Services" key="services">
                    <ServicesOfferedList offeredServices={details.offeredServices ? details.offeredServices : []} />
                </TabPane>
                <TabPane tab="Projects" key="projects">
                    <FinishedProjectsList finishedProjects={details.finishedProjects ? details.finishedProjects : []} />
                </TabPane>
                <TabPane tab="Reviews" key="reviews">
                    <ReviewList reviews={details.reviews ? details.reviews : []} />
                </TabPane>
            </Tabs>
        </div>
    );
};

const FinishedProjectsList = ({ finishedProjects }) => {
    return (
        <div>
            {finishedProjects.map((singleFinishedProject) => {
                return (
                    <ProjectContainer>
                        <ProjectTitle>{singleFinishedProject.service?.name}</ProjectTitle>
                        <ProjectDescription>Ordered by {singleFinishedProject.orderFrom?.name}</ProjectDescription>
                        <ProjectDescription>Order Date {singleFinishedProject.createdDate}</ProjectDescription>
                        <ProjectDescription>Review {singleFinishedProject.review}</ProjectDescription>
                        <ProjectDescription>Rating {singleFinishedProject.rating}</ProjectDescription>
                        <ProjectDescription>
                            Project Status: <Tag color={'green'}> Finished</Tag>
                        </ProjectDescription>
                    </ProjectContainer>
                );
            })}
        </div>
    );
};

const ReviewList = ({ reviews }) => {
    return (
        <div>
            {reviews.map((singleReview) => {
                return (
                    <ProjectContainer>
                        <ProjectTitle>{singleReview.review}</ProjectTitle>
                        <ProjectDescription> Reviewed by: {singleReview.reviewBy?.name}</ProjectDescription>
                        <Rate allowHalf defaultValue={singleReview.rating} value={singleReview.rating} />
                    </ProjectContainer>
                );
            })}
        </div>
    );
};

const ServicesOfferedList = ({ offeredServices }) => {
    return (
        <div>
            {offeredServices.map((singleService) => {
                return (
                    <ProjectContainer>
                        <ProjectTitle>{singleService.name}</ProjectTitle>
                        <Tag color={'blue'}>{singleService.type}</Tag>
                        <ProjectDescription>{singleService.description}</ProjectDescription>
                        <ProjectDescription>Rate: {singleService.hourlyRate}$</ProjectDescription>
                        {/*<ProjectDescription>Service type: {singleService.type}</ProjectDescription>*/}
                    </ProjectContainer>
                );
            })}
        </div>
    );
};

const ProjectContainer = styled.div`
    border: 1px solid #e6e8e7;
    padding: 10px;
    margin: 10px 0px;
`;

const ProjectTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
`;
const ProjectDescription = styled.div`
    font-size: 14px;
    color: grey;
`;

const ServiceProviderName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const ServiceProviderRating = styled.div`
    font-size: 16px;
    color: grey;
`;
