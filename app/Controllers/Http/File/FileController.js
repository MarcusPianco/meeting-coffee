/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const File = use('App/Models/File');
const Helpers = use('Helpers');
/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async store({ request, response }) {
    try {
      if (!request.file) return;
      const upload = request.file('file', { size: '2mb' });
      const fileName = `${Date.now()}.${upload.subtype}`;
      await upload.move(Helpers.tmpPath('uploads'), { name: fileName });

      if (!upload.moved) {
        throw upload.error();
      }
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });
      return file;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'error in file upload' } });
    }
  }

  async show({ params, response }) {
    const file = await File.findOrFail(params.file_id);
    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }
}

module.exports = FileController;
