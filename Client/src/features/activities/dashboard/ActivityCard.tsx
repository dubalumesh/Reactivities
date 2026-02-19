import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
type Props = {
    activity: Activity,
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void

}

export default function ActivityCard({ activity,
    selectActivity, deleteActivity }: Props) {
    return (
        <>
            <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {activity.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1 }} >
                        {activity.date}
                    </Typography>
                    <Typography variant="body2" >
                        {activity.description}
                    </Typography>
                    <Typography variant="subtitle2" >
                        {activity.city}/{activity.venue}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                    <Chip label={activity.category} variant="outlined" />
                    <Box>
                        <Button variant="outlined" onClick={() => {
                            selectActivity(activity.id)


                        }} size="medium">View</Button>
                        <Button variant="outlined" color="error" onClick={() => {
                            deleteActivity(activity.id)
                        }} size="medium">Delete</Button>

                    </Box>


                </CardActions>

            </Card>

        </>
    )
}
