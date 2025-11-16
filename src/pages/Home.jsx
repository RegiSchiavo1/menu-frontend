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
    <>
      {/* ===================================================== */}
      {/* 🔵 HERO PRINCIPAL 50/50 */}
      {/* ===================================================== */}
      <Box
        sx={{
          width: "100vw",
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          backgroundColor: "#0f1b2b",
        }}
      >
        {/* IZQUIERDA */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? 4 : 8,
            color: "white",
            backgroundColor: "#0f1b2b",
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

        {/* DERECHA - CARRUSEL */}
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

        {/* CONTROLES */}
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

      {/* ===================================================== */}
      {/* ⭐ SECCIÓN RESEÑAS (6 CARDS + 3D HOVER) */}
      {/* ===================================================== */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0c1623",
          color: "white",
          py: 10,
          px: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontWeight: 700,
            mb: 6,
            textAlign: "center",
          }}
        >
          Reseñas Destacadas ⭐
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 4,
          }}
        >
          {[
            {
              img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
              title: "Pasta Carbonara 🇮🇹",
              desc: "Panceta crocante, yema de huevo y pecorino romano.",
              stars: "⭐⭐⭐⭐⭐",
            },
            {
              img: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg",
              title: "Paella Valenciana 🇪🇸",
              desc: "Arroz al azafrán con mariscos y pollo.",
              stars: "⭐⭐⭐⭐☆",
            },
            {
              img: "https://images.pexels.com/photos/1580466/pexels-photo-1580466.jpeg",
              title: "Wiener Schnitzel 🇦🇹",
              desc: "Crujiente por fuera, tierna por dentro.",
              stars: "⭐⭐⭐⭐⭐",
            },
            {
              img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
              title: "Ratatouille 🇫🇷",
              desc: "Verduras frescas con aceite de oliva y especias.",
              stars: "⭐⭐⭐⭐⭐",
            },
            {
              img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
              title: "Goulash Húngaro 🇭🇺",
              desc: "Carne tierna en salsa paprika tradicional.",
              stars: "⭐⭐⭐⭐⭐",
            },
            {
              img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
              title: "Moussaka Griega 🇬🇷",
              desc: "Berenjenas, cordero y bechamel gratinada.",
              stars: "⭐⭐⭐⭐☆",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                backgroundColor: "#152232",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transform: "perspective(1000px) translateZ(0)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform:
                    "perspective(1000px) translateZ(20px) rotateX(4deg) rotateY(-4deg)",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.6)",
                },
              }}
            >
              <img
                src={item.img}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Box sx={{ p: 3 }}>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: 600, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#cfd3d6", mb: 2 }}>{item.desc}</Typography>
                <Typography sx={{ color: "#ffdd55", fontSize: "1.4rem" }}>
                  {item.stars}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ===================================================== */}
      {/* 🏆 TOP RESTAURANTES */}
      {/* ===================================================== */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0f1b2b",
          color: "white",
          py: 8,
          px: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontWeight: 700,
            mb: 5,
            textAlign: "center",
          }}
        >
          Top Restaurantes 🍽️
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {["Rodizio Italiano", "El Sabor Español", "Bistró París"].map(
            (rest) => (
              <Box
                key={rest}
                sx={{
                  backgroundColor: "#152232",
                  color: "white",
                  p: 3,
                  borderRadius: 3,
                  width: "300px",
                  textAlign: "center",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.6)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.4rem", fontWeight: 600, mb: 1 }}>
                  {rest}
                </Typography>
                <Typography sx={{ color: "#ffdd55", fontSize: "1.3rem" }}>
                  ⭐⭐⭐⭐⭐
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Box>

      {/* ===================================================== */}
      {/* 🍛 PLATOS MÁS PEDIDOS */}
      {/* ===================================================== */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0c1623",
          color: "white",
          py: 10,
          px: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontWeight: 700,
            mb: 5,
            textAlign: "center",
          }}
        >
          Platos Más Pedidos 🔥
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 4,
          }}
        >
          {[
            {
              img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
              name: "Pizza Margarita",
            },
            {
              img: "https://www.southernliving.com/thmb/rh5eWwbkBgA7gXo54f9OnwJka48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Fettuccine_Alfredo_006-aa0899e03f394690885e85a3ec4ea3d0.jpg",
              name: "Pasta Alfredo",
            },
            {
              img: "https://www.siftandsimmer.com/wp-content/uploads/2023/08/smoked-salmon-bagels-featured-500x500.jpg",
              name: "Bagel de Salmón",
            },
          ].map((p) => (
            <Box
              key={p.name}
              sx={{
                backgroundColor: "#152232",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
                },
              }}
            >
              <img
                src={p.img}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  p: 2,
                  textAlign: "center",
                }}
              >
                {p.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}









