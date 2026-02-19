

import { Grid } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';

type Props = {
    activities: Activity[],
    selectedActivity?: Activity,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,
    openForm: (id?: string) => void,
    closeForm: () => void,
    editMode: boolean,
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

export default function ActivityDashboard({ activities, selectedActivity,
    selectActivity, cancelSelectActivity, openForm, closeForm,
    editMode, createOrEdit, deleteActivity }: Props) {

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={7}>
                    <ActivityList activities={activities}
                        selectActivity={selectActivity} deleteActivity={deleteActivity} />
                </Grid>
                <Grid size={5}>
                    {selectedActivity && !editMode && <ActivityDetail activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity} openForm={openForm}
                        editMode={editMode}
                    />}

                    {editMode && <ActivityForm closeForm={closeForm}
                        activity={selectedActivity} createOrEdit={createOrEdit} />}

                </Grid>

            </Grid>
        </>
    )
}
