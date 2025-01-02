import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function GridLayout() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Item> Test1 </Item>
      </Grid>
      <Grid size={4}>
        <Item> Test2 </Item>
      </Grid>
      <Grid size={4}>
        <Item> Test3 </Item>
      </Grid>
    </Grid>
  );
}

export default GridLayout;
