import { Request, Response } from "express";
import {
  getFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../service/folderServices";

export const getAllFolders = async (req: Request, res: Response) => {
  const folders = await getFolders();
  res.json(folders);
};

export const getFolder = async (req: Request, res: Response) => {
  const folder = await getFolderById(Number(req.params.id));
  if (!folder) return res.status(404).send("Folder not found");
  res.json(folder);
};

export const createNewFolder = async (req: Request, res: Response) => {
  const { userId, name } = req.body;

  // if (!userId) {
  //   return res.status(400).send("User ID not found");
  // }

  try {
    const folder = await createFolder({ userId, name }); // Call the service to create the folder
    res.status(201).json(folder); // Respond with the created folder
  } catch (error) {
    res.status(500).send("Error creating folder");
  }
};

export const updateExistingFolder = async (req: Request, res: Response) => {
  const folder = await updateFolder(Number(req.params.id), req.body);
  if (!folder) return res.status(404).send("Folder not found");
  res.json(folder);
};

export const removeFolder = async (req: Request, res: Response) => {
  const folder = await deleteFolder(Number(req.params.id));
  if (!folder) return res.status(404).send("Folder not found");
  res.json(folder);
};
