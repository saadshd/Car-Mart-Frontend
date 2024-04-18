import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Skeleton,
} from "@mui/material";

function EntityPageSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <CardHeader
              title={<Skeleton animation="wave" variant="text" width="70%" />}
            />
            <CardMedia>
              <Skeleton
                animation="wave"
                sx={{ mx: 2 }}
                variant="rectangular"
                height={120}
              />
            </CardMedia>
            <CardContent>
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" width="80%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default EntityPageSkeleton;
