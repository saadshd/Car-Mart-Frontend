import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Toolbar,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import config from "../../config/config";
import ActionDialog from "../shared/ActionDialog";
import { CarType } from "../../entities/carInventory/interface";
import { CustomerType } from "../../entities/customer/interface";
import { SalesPersonType } from "../../entities/salesPerson/interface";
import * as utils from "../../utils/utils";
import EntityDetailPageSkeleton from "./EntityDetailPageSkeleton";
import FullScreenImageView from "../shared/FullScreenImageView";

interface EntityDetailPageProps {
  endpoint: string;
}

function EntityDetailPage(props: EntityDetailPageProps) {
  const { endpoint } = props;
  const whiteListKeys = [
    "_id",
    "name",
    "image",
    "__v",
    "make",
    "modelName",
    "variant",
    "price",
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<
    CarType | CustomerType | SalesPersonType | null
  >(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const { _id } = useParams();
  const axiosInstance = useAxios();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleImageClick = (src: string) => {
    setFullScreenImage(src);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  function getTitle(data: CarType | CustomerType | SalesPersonType): string {
    if ("make" in data && "modelName" in data && "variant" in data) {
      return `${(data as CarType).make} ${(data as CarType).modelName} ${
        (data as CarType).variant
      }`;
    } else {
      return data.name;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axiosInstance.get(`${endpoint}/${_id}`);
        setData(response.data.data);
      } catch (error: any) {
        setError(error);
        setOpenDialog(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, _id]);

  if (loading) {
    return <EntityDetailPageSkeleton />;
  }

  if (error && openDialog) {
    return (
      <ActionDialog
        open={openDialog}
        title="Error"
        contentText={error}
        onConfirmText="Ok"
        onConfirm={handleCloseDialog}
      />
    );
  }

  if (!data) {
    return <Box mt={20}>No data...</Box>;
  }

  return (
    <Box p={2}>
      <Toolbar />
      <Typography variant="h4" color="primary" fontWeight="bold" py={3}>
        {getTitle(data)}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          {Object.entries(data).map(([key, value]) => {
            if (
              key.toLowerCase().includes("image") &&
              typeof value === "string"
            ) {
              return (
                <CardMedia
                  key={key}
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    marginBottom: 2,
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                    cursor: "zoom-in",
                  }}
                  image={`${config.imagesUrl}${value}`}
                  alt={`${getTitle(data)} Image`}
                  onClick={() =>
                    handleImageClick(`${config.imagesUrl}${value}`)
                  }
                />
              );
            }

            return null;
          })}
          {fullScreenImage && (
            <FullScreenImageView
              src={fullScreenImage}
              alt={`${getTitle(data)} Image`}
              onClose={handleCloseFullScreen}
            />
          )}
        </Grid>
        <Grid item xs={12} md={(data as CarType).image ? 5 : 12}>
          {Object.entries(data).map(([key, value]) => {
            if (key === "price") {
              return (
                <Card sx={{ mb: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {utils.formatKey(key)}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {utils.formatPrice(value)}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }

            return null;
          })}
          <Card>
            <CardContent>
              {Object.entries(data).map(([key, value]) => {
                if (whiteListKeys.includes(key)) {
                  return null;
                }

                if (key === "mileage") {
                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: "2px",
                      }}
                    >
                      <Typography>{utils.formatKey(key)}</Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {utils.formatMileage(value)}
                      </Typography>
                    </Box>
                  );
                }

                if (key === "createdAt") {
                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: "2px",
                      }}
                    >
                      <Typography>
                        {utils.formatKey(key)
                          ? "Date Created"
                          : utils.formatKey(key)}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {utils.convertUTCToLocal(value)}
                      </Typography>
                    </Box>
                  );
                }

                if (key === "updatedAt") {
                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: "2px",
                      }}
                    >
                      <Typography>
                        {utils.formatKey(key)
                          ? "Last Updated"
                          : utils.formatKey(key)}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {utils.convertUTCToLocal(value)}
                      </Typography>
                    </Box>
                  );
                }

                if (key === "isSold") {
                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: "2px",
                      }}
                    >
                      <Typography sx={{}}>
                        {utils.formatKey(key)
                          ? "Availability Status"
                          : utils.formatKey(key)}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: value ? "red" : "green",
                        }}
                      >
                        {value ? "Sold" : "Available"}
                      </Typography>
                    </Box>
                  );
                }

                if (key === "document" && Array.isArray(value)) {
                  return (
                    <Box key={key} p="2px">
                      <Typography>{utils.formatKey(key)}</Typography>
                      <Box pt={1} sx={{ display: "flex", flexWrap: "wrap" }}>
                        {value.map((value, index) => (
                          <Chip
                            size="small"
                            icon={<CheckCircleIcon color="primary" />}
                            key={index}
                            label={value}
                            sx={{
                              mr: 1,
                              mb: 1,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  );
                }

                if (key === "purchaseHistory" && Array.isArray(value)) {
                  return (
                    <>
                      {value.length !== 0 ? (
                        <Box key={key} p="2px">
                          <Typography>{utils.formatKey(key)}</Typography>
                          <List>
                            {value.map((purchase, index) => (
                              <ListItem key={index}>
                                <ListItemAvatar>
                                  <Avatar variant="rounded">
                                    <Typography color="primary">{`${
                                      index + 1
                                    }`}</Typography>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`Chasis No: ${purchase.chasisNo}`}
                                  secondary={`Purchase Date: ${utils.convertUTCToLocal(
                                    purchase.purchaseDate
                                  )}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ) : (
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: "2px",
                          }}
                        >
                          <Typography>{utils.formatKey(key)}</Typography>
                          <Typography sx={{ fontWeight: "bold" }}>
                            No History
                          </Typography>
                        </Box>
                      )}
                    </>
                  );
                }

                return (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: "2px",
                    }}
                  >
                    <Typography>{utils.formatKey(key)}</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EntityDetailPage;
