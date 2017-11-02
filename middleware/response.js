const errorHsndler =

  module.exports = {
    response: async (req, res, result) => {
      try {
        switch (req.method) {
          case 'GET':
            return res.status(200).json(result);

          // case 'PUT':
          //   if (result) {
          //     res.status(200).send(result);
          //   } else {
          //     throw { Message: "HTTP:PUT No Returned Object?", File: __filename, Collection: collection.collection.collectionName };
          //   }

          //   break;

          // case 'POST':
          //   if (result) {
          //     res.status(201).send(result);
          //   } else {
          //     throw { Message: "HTTP:POST No Returned Object?", File: __filename, Collection: collection.collection.collectionName };
          //   }

          //   break;

          // case 'DELETE':
          //   if (_.isEmpty({ result })) {
          //     res.status(204).send();
          //   } else if (result.IsDeleted) {
          //     res.status(200).send(result);
          //   } else {
          //     throw { Message: "HTTP:DELETE error", File: __filename, Collection: collection.collection.collectionName };
          //   }

          //   break;
        }
      } catch (error) {
        res.status(400);
        error = await errorHandler.error(error, 'Service Unavailable', __filename, res.statusCode);
        res.json({ error });
        throw (error);
      }
    }
  }
