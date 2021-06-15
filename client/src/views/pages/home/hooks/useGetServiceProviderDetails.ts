import { useQuery } from 'react-query';
import axios from 'axios';
const fetchServiceDetails = async (serviceId) => {
    return axios.get(`http://localhost:5000/api/v1/service/${serviceId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}`,
        },
    });
};
export const useGetServiceProviderDetails = (serviceId: number) => {
    const { status, data, error, isLoading } = useQuery(['serviceDetails', serviceId], () => fetchServiceDetails(serviceId));

    return { status, data, error, isLoading };
};
