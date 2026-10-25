import { ValidationError } from "../lib/errors";
import * as repository from "../repositories/projectRepository";

export const PROJECT_NAME_MAX_LENGTH = 60;
export const PROJECT_DESCRIPTION_MAX_LENGTH = 300;

export async function createProject(workspaceId: string, nameInput: string, descriptionInput: string): Promise<void> {
  const name = nameInput.trim();
  const description = descriptionInput.trim();
  if (name.length === 0) throw new ValidationError("Enter a project name.");
  if (name.length > PROJECT_NAME_MAX_LENGTH) {
    throw new ValidationError(`The name can have at most ${PROJECT_NAME_MAX_LENGTH} characters.`);
  }
  if (description.length > PROJECT_DESCRIPTION_MAX_LENGTH) {
    throw new ValidationError(`The description can have at most ${PROJECT_DESCRIPTION_MAX_LENGTH} characters.`);
  }
  await repository.insertProject({
    id: crypto.randomUUID(),
    workspaceId,
    name,
    description,
    now: new Date().toISOString(),
  });
}
