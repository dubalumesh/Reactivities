import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export default function useActivities() {

    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('activities');
            //console.log(response.data);
            return response.data;
        }
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

    return { activities, isPending, updateActivity, createActivity, deleteActivity };

}