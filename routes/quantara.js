var express = require("express");
var router = express.Router();
const { quantaraAlert } = require("../data/quantaraAlerts");

/**GET**/
router.get("/getQuantara/:alert", function (req, res, next) {
  const headersFoundAlert = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };


  const alertParam = req.params.alert;
  let response = "";
  const foundAlert = quantaraAlert.find(
    (alerte) => alerte.alert === alertParam
  );

  if (foundAlert) {
    res.writeHead(200, headersFoundAlert);
    response = `ID de l'alerte ${alertParam} : ${foundAlert.id}`;
    res.write(response);
    const clientId = Date.now();
    const newClient = {
      id: clientId,
      res,
    };
    foundAlert.arrStatus.push(newClient);
    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      foundAlert.arrStatus = foundAlert.arrStatus.filter(
        (client) => client.id !== clientId
      );
    });
  } else {
    res.sendStatus(404);
    res.end;
  }
});

/**POST**/
const sendEventsToAll = (newFact, arr) => {
  arr.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
};

router.post("/add/:alert", async (req, res, next) => {
  const alertParam = req.params.alert;
  const newAlert = req.body;
  const foundAlert = quantaraAlert.find(
    (alerte) => alerte.alert === alertParam
  );
  if (foundAlert) {
    response = `ID de l'alerte ${alertParam} : ${foundAlert.id}`;
    foundAlert.arrFacts.push(newAlert);
    res.json(newAlert);
    return sendEventsToAll(newAlert, foundAlert.arrStatus);
  } else {
    sendStatus(404);
  }
});

module.exports = router;
