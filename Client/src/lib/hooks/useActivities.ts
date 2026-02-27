import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";

export default function useActivities(id?: string) {
    const queryClient = useQueryClient();
    const location =useLocation();

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('activities');
            //console.log(response.data);
            return response.data;
        },
        enabled: !id && location.pathname==='/activities'

    });


    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`activities/${id}`);
            //console.log(response.data);
            return response.data;
        },
        enabled: !!id

    });
    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.put('activities', activity);
            return response.data;
        },
        onSuccess: () => {            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post<string>('activities', activity);
            return response.data;
        },
        onSuccess: () => {            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            const response = await agent.delete(`activities/${id}`);
            return response.data;
        },
        onSuccess: () => {            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        }
    });

    return {
        activities,
        isPending,
        activity,
        isLoadingActivity,
        updateActivity,
        createActivity,
        deleteActivity
    };

}