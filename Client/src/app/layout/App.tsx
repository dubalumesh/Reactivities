import { Box, Container, CssBaseline, Typography } from "@mui/material";

import { useState } from "react";
import NavBar from "./NavBar";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import useActivities from "../../lib/hooks/useActivities";

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    console.log(id);

    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
  const handleFormOpen = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  return (
    <Box sx={{ backgroundColor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {!activities || isPending ? (<Typography>Loading activities...</Typography>)
          : (<ActivityDashboard activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            editMode={editMode}


          />)
        }



      </Container>


    </Box>
  )
}

export default App


