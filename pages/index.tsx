import type { NextPage } from "next";
import { CardHeader, Grid, Card } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home OpenJira">
      <Grid container>
        <Grid xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pending" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)", margin: "0 5px" }}>
            <CardHeader title="In progress" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Finished" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
