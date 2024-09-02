import { Request, Response } from "express";
import { connectDb } from "../database";
import { Issue } from "../models/issue";

class IssueController {
  getIssues = async (req: Request, res: Response) => {
    try {
      const db = await connectDb();
      const issues = await db.all<Issue[]>('SELECT * FROM issues');
      res.json(issues);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error processing request' })
    }
  };
  createIssue = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const db = await connectDb();
      const result = await db.run('INSERT INTO issues (title, description) VALUES (?, ?)', [title, description]);
      res.json({ id: result.lastID, title, description });
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' })
    }
  };
  updateIssue = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const db = await connectDb();
      const result = await db.run('UPDATE issues SET title = ?, description = ? WHERE id = ?', [title, description, id]);
      if (result.changes) {
        res.json({ id: id, title, description });
      } else {
        res.status(404).json({ error: 'Issue not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' })
    }
  };
  deleteIssue = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const db = await connectDb();
      const result = await db.run('DELETE FROM issues where id = ?', [id]);
      if (result.changes) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Issue not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' });
    }
  };
}

export default new IssueController();