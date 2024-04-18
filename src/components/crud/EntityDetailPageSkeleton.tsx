import { Card, CardContent, Box, Grid, Skeleton, Toolbar } from "@mui/material";

function EntityDetailPageSkeleton() {
  return (
    <Box p={2}>
      <Toolbar />
      <Skeleton
        animation="wave"
        variant="text"
        width="50%"
        sx={{ fontSize: "4rem" }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card>
            <Skeleton animation="wave" variant="rectangular" height={400} />
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" width="80%" />
              <Skeleton animation="wave" variant="text" width="80%" />
              <Skeleton animation="wave" variant="text" width="70%" />
              <Skeleton animation="wave" variant="text" width="60%" />
              <Skeleton animation="wave" variant="text" width="60%" />
              <Skeleton animation="wave" variant="text" width="50%" />
              <Skeleton animation="wave" variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EntityDetailPageSkeleton;
