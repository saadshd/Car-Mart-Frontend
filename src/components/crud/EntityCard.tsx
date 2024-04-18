import { useState } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import useAxios from "../../hooks/useAxios";
import { Typography, Grid, Box, Card, CardContent } from "@mui/material";
import { CarType } from "../../entities/carInventory/interface";
import { CustomerType } from "../../entities/customer/interface";
import { SalesPersonType } from "../../entities/salesPerson/interface";
import ActionDialog from "../shared/ActionDialog";
import MenuButton from "../shared/MenuButton";
import FullScreenImageView from "../shared/FullScreenImageView";
import EntityDialog, { FormData } from "./EntityDialog";
import { FormFieldProps } from "./EntityFormField";
import config from "../../config/config";
import * as utils from "../../utils/utils";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface EntityCardProps {
  data: CarType[] | CustomerType[] | SalesPersonType[];
  endpoint: string;
  title: string;
  formFields: FormFieldProps[];
  onDelete: (id: string) => void;
  contentType?: string;
  onPost: (postData: any, id?: string) => void;
}

function EntityCard(props: EntityCardProps) {
  const { endpoint, data, onDelete, onPost, contentType, title, formFields } =
    props;
  const menuItems = [
    { label: "Edit", icon: <EditRoundedIcon fontSize="small" /> },
    { label: "Delete", icon: <DeleteRoundedIcon fontSize="small" /> },
  ];
  const whiteListKeys = [
    "_id",
    "name",
    "make",
    "modelName",
    "variant",
    "engineNo",
    "fuelType",
    "registrationNo",
    "registeredIn",
    "transmissionType",
    "taxHistory",
    "assembly",
    "document",
    "image",
    "createdAt",
    "updatedAt",
    "__v",
    "isSold",
    "address",
  ];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const [openPutDialog, setOpenPutDialog] = useState<boolean>(false);
  const [editData, setEditData] = useState<FormData>({});
  const [editItem, setEditItem] = useState<string | undefined>(undefined);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const axiosInstance = useAxios();

  const fetchEntityDetails = async (id: string) => {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      setEditData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching entity details:", error);
    }
  };

  const handleImageClick = (src: string) => {
    setFullScreenImage(src);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  const handleOpenPutDialog = async (id: string) => {
    setEditItem(id);
    await fetchEntityDetails(id);
    setOpenPutDialog(true);
  };

  const handleClosePutDialog = () => {
    setOpenPutDialog(false);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeleteItem(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleMenuItemClick = (menuItem: string, id: string) => {
    if (menuItem === "Delete") {
      handleOpenDeleteDialog(id);
    }
    if (menuItem === "Edit") {
      handleOpenPutDialog(id);
    }
  };

  const handleDelete = async (id: string) => {
    onDelete(id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteItem) {
      await handleDelete(deleteItem);
      handleCloseDeleteDialog();
    }
  };

  function getTitle(data: CarType | CustomerType | SalesPersonType): string {
    if ("make" in data && "modelName" in data) {
      return `${(data as CarType).make} ${(data as CarType).modelName}`;
    } else {
      return data.name;
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        {data.map((data: CarType | CustomerType | SalesPersonType) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={data._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 0.5,
                }}
              >
                <Link
                  key={data._id}
                  to={`${endpoint}/${data._id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 2,
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "black",
                      "&:hover": {
                        color: "secondary.dark",
                      },
                    }}
                  >
                    {getTitle(data)}
                  </Typography>
                </Link>
                <MenuButton
                  menuItems={menuItems}
                  onMenuItemClick={(item) =>
                    handleMenuItemClick(item, data._id)
                  }
                />
              </Box>

              {Object.entries(data).map(([key, value]) => {
                if (
                  key.toLowerCase().includes("image") &&
                  typeof value === "string"
                ) {
                  return (
                    <Box
                      key={data._id}
                      sx={{
                        mx: 2,
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        paddingTop: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleImageClick(`${config.imagesUrl}${value}`)
                      }
                    >
                      <LazyLoad height={"100%"} offset={100}>
                        <img
                          key={data._id}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0,
                            transition:
                              "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                            cursor: "zoom-in",
                          }}
                          src={`${config.imagesUrl}${value}`}
                          alt={`${getTitle(data)} Image`}
                          onLoad={(e) => {
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.style.opacity = "1";
                          }}
                        />
                      </LazyLoad>
                      {(data as CarType).isSold && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            backgroundColor: "rgba(255, 0, 0, 0.8)",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                          }}
                        >
                          Sold
                        </Box>
                      )}
                    </Box>
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
              <CardContent>
                {Object.entries(data).map(([key, value]) => {
                  if (whiteListKeys.includes(key)) {
                    return null;
                  }

                  if (key === "purchaseHistory" && Array.isArray(value)) {
                    return (
                      <Link
                        key={data._id}
                        to={`${endpoint}/${data._id}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            "&:hover": {
                              color: "secondary.dark",
                            },
                          }}
                        >
                          <Typography variant="body2">
                            {utils.formatKey(key)}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {value.length !== 0 ? "Available" : "No History"}
                          </Typography>
                        </Box>
                      </Link>
                    );
                  }

                  if (key === "price") {
                    return (
                      <Box
                        key={key}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {utils.formatKey(key)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {utils.formatPrice(value)}
                        </Typography>
                      </Box>
                    );
                  }

                  if (key === "mileage") {
                    return (
                      <Box
                        key={key}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {utils.formatKey(key)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {utils.formatMileage(value)}
                        </Typography>
                      </Box>
                    );
                  }

                  return (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        {utils.formatKey(key)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {value}
                      </Typography>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {openDeleteDialog && (
        <ActionDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteConfirm}
          title="Delete Item"
          contentText="Are you sure you want to delete?"
          onConfirmText="Delete"
        />
      )}
      {openPutDialog && editData && (
        <EntityDialog
          title={title}
          formFields={formFields}
          open={openPutDialog}
          handleClose={handleClosePutDialog}
          contentType={contentType}
          onPost={onPost}
          initialData={editData}
          id={editItem}
        />
      )}
    </>
  );
}

export default EntityCard;
