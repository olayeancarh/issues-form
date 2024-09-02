import express, { Application, Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";
import IssueController from "./controllers/issueController";

const app: Application = express();
const PORT: number = 3000;

app.use(json());
app.use(cors());

app.get('/issues', IssueController.getIssues);
app.post('/issues', IssueController.createIssue);
app.put('/issues/:id', IssueController.updateIssue);
app.delete('/issues/:id', IssueController.deleteIssue);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "SITEMATE CHALLENGE!!!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
