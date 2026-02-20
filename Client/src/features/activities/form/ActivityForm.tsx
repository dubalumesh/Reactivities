
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react';
import useActivities from '../../../lib/hooks/useActivities';

type Props = {
    activity?: Activity,
    closeForm: () => void,

}


export default function ActivityForm({ activity, closeForm }: Props) {

    const { updateActivity, createActivity } = useActivities();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // Call createOrEdit with the data
        const activityData: Activity = {
            id: activity?.id || crypto.randomUUID(),
            title: data.title as string,
            description: data.description as string,
            category: data.category as string,
            date: data.date as string,
            city: data.city as string,
            venue: data.venue as string,
            isCancelled: false,
            latitude: 0,
            longitude: 0
        };
        if (activity) {
            // Assuming createOrEdit is passed down from parent component
            await updateActivity.mutateAsync(activityData);
            closeForm();
        } else {
            await createActivity.mutateAsync(activityData);
            closeForm();
        }


    }

    return (
        <>
            <Paper sx={{ borderRadius: 3, padding: 3 }}>
                <Typography variant='h5' color='primary' gutterBottom>
                    {activity ? 'Edit Activity' : 'Create Activity'}
                </Typography>
                <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3} >
                    <TextField name='title' label='Title' defaultValue={activity?.title || ''} />
                    <TextField name='description' label='Description' multiline rows={4} defaultValue={activity?.description || ''} />
                    <TextField name='category' label='Category' defaultValue={activity?.category || ''} />
                    <TextField name='date' label='Date' type='date' defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : ''} />
                    <TextField name='city' label='City' defaultValue={activity?.city || ''} />
                    <TextField name='venue' label='Venue' defaultValue={activity?.venue || ''} />
                    <Box display='flex' justifyContent='end' gap={3}>
                        <Button onClick={() => { closeForm() }} color='inherit'>Cancel</Button>
                        <Button type='submit'
                            variant='contained'
                            loading={updateActivity.isPending || createActivity.isPending}
                            color='success'>Submit</Button>

                    </Box>
                </Box>

            </Paper>
        </>
    )
}
