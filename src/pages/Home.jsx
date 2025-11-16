import { Typography, Box, Button, useTheme, IconButton, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { loginGuest } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Img1 from "../assets/images/1.png";
import Img2 from "../assets/images/2.png";
import Img3 from "../assets/images/3.png";
import Img4 from "../assets/images/4.png";
import Img5 from "../assets/images/5.png";

const carouselImages = [Img1, Img2, Img3, Img4, Img5];

export default function Home() {
  const nav = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % carouselImages.length);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        overflow: "hidden",
        backgroundColor: "#0f1b2b", // color de fondo global
      }}
    >

      {/* ==================== IZQUIERDA (Texto) ==================== */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile ? 4 : 8,
          color: "white",
          backgroundColor: "#0f1b2b", // azul elegante
        }}
      >
        <Typography
          sx={{
            fontFamily: `"DM Serif Text", serif`,
            fontSize: isMobile ? "2rem" : "3.2rem",
            lineHeight: 1.2,
            maxWidth: "500px",
            mb: 3,
          }}
        >
          Explora Menús, Descubrí Sabores Únicos.
        </Typography>

        <Typography
          sx={{
            fontSize: "1.1rem",
            maxWidth: "450px",
            mb: 4,
            color: "#e4e4e4",
          }}
        >
          Tu próxima experiencia gastronómica, a un clic de distancia.
        </Typography>

        {/* --- BOTONES SIMPLES --- */}
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "220px",
            mb: 2,
            backgroundColor: "#1e4f8e",
          }}
          onClick={() => nav("/restaurants")}
        >
          Ver Restaurantes
        </Button>

    
      </Box>

      {/* ==================== DERECHA (Carrusel) ==================== */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          height: "100%",
          backgroundImage: `url(${carouselImages[activeIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          transition: "background-image 0.5s ease-in-out",
        }}
      />

      {/* ==================== Controles ==================== */}
      {!isMobile && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "2%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "2%",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}






