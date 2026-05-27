//admin user filters

import type { Role } from "@/shared/enums/role.enum";
import type { Position, Location } from "@/shared/enums/user.enum";

export interface AdminUserFilters {
   search: string;
   role: Role | "";
   position: Position | "";
   location: Location | "";
}