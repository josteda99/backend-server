const getMenuFrontEnd = (role = "USER_ROL") => {
  const menu = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "ProgressBar", url: "progress" },
        { titulo: "Gráficas", url: "grafica1" },
        { titulo: "Promesas", url: "promesas" },
        { titulo: "Rjxs", url: "rjxs" },
      ],
    },
    {
      titulo: "mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Medicos", url: "medicos" },
      ],
    },
  ];

  if (role === "ADMIN_ROL") {
    return menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
  }

  return menu;
};

module.exports = { getMenuFrontEnd };
