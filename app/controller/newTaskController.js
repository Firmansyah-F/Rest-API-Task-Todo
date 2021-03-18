
  // static async getRole(req, res, next) {
  //   try {
  //     const role = req.user.role;
  //     if (role === "user") {
  //       const data = {
  //         userId: req.user.id,
  //         assignee: req.user.id,
  //         title: req.body.title,
  //         description: req.body.description,
  //         dueDate: req.body.dueDate,
  //         status: "todo",
  //         attachment: req.body.attachment,
  //       };
  //       return baseResponse({ message: "asdasdsad", data: data })(res, 200);
  //     }
  //     // if (role==="admin") {
  //     //   return baseResponse({ message: "success ini admin", data: role })(res, 200)
  //     // }
  //     // return baseResponse({ message: "success ini bukan", data: role })(res, 200)
  //   } catch (error) {
  //     res.status(500);
  //     next(error);
  //   }
  // }

  // static async getIdTaskByRoleAssigne(req, res, next) {
  //   const role = req.user.role;
  //   if (role == "user") {
  //     const data = await task.findAll({ where: { assignee: req.user.id } });
  //     const dataMap = data.filter((e) => {
  //       return e.dataValues.id === 2;
  //     });

  //     // return baseResponse({ message: "successssss", data:dataMap });
  //     console.log(dataMap.length);
  //     if (dataMap.length === 0) {
  //       console.log("Data kosong");
  //     } else {
  //       console.log("Data TIDAKKK kosong");
  //     }
  //     return baseResponse({ message: "success", data: dataMap })(res, 200);
  //   }
  // }