import { Router } from 'express';
import { wifiTariffsService } from './wifi-tariff.service';
import { sendError, sendSuccess } from '../core/api-response';

const router = Router();

// Get all wifi tariffs
router.get('/', (req, res) => {
  const data = wifiTariffsService.getAll();
  sendSuccess(res, data);
});

// Get a wifi tariff by id
router.get('/:id', (req, res) => {
  const data = wifiTariffsService.getById(parseInt(req.params.id));
  data ? sendSuccess(res, data) : sendError(res, 'Wifi tariff not found', 404);
});

// Create a new wifi tariff
router.post('/', (req, res) => {
  const data = wifiTariffsService.create(req.body);
  data ? sendSuccess(res, data) : sendError(res, 'Failed to create wifi tariff', 400);
});

// Update a wifi tariff by id
router.put('/:id', (req, res) => {
  const data = wifiTariffsService.update(parseInt(req.params.id), req.body);
  data ? sendSuccess(res, data) : sendError(res, 'Failed to update wifi tariff', 400);
});

// Delete a wifi tariff by id
router.delete('/:id', (req, res) => {
  const deletedItem = wifiTariffsService.delete(parseInt(req.params.id));
  deletedItem 
    ? sendSuccess(res, deletedItem) 
    : sendError(res, 'Wifi tariff not found', 404);
});

export default router;