import { Router } from 'express';
import { UserRoutes } from './modules/user/user.route';
import { DoctorRoutes } from './modules/doctor/doctor.route';
import { AppointmentRoutes } from './modules/appointment/appointment.route';

const router = Router();

[
  { path: '/users', route: UserRoutes },
  { path: '/doctors', route: DoctorRoutes },
  { path: '/appointments', route: AppointmentRoutes },
].forEach(({ path, route }) => router.use(path, route));

export const routes = router;
