-- =============================================================================
-- Users F&F-MEDIC

-- ASSUMES ROLES ALREADY EXIST (created via Neon Console)
-- ffmedic_admin_user  - Admin role with full access
-- ffmedic_app_user    - Application role with CRUD access (audits excluded)
-- ffmedic_audit_user  - Audit role with read-only access
-- =============================================================================
--
-- =============================================================================
-- PERMISSIONS
-- =============================================================================

SET search_path TO ff_medic_db;

-- Admin: full access
GRANT ALL ON SCHEMA ff_medic_db TO ffmedic_admin_user;
GRANT ALL ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_admin_user;

-- App user: CRUD on all tables except audits
GRANT USAGE ON SCHEMA ff_medic_db TO ffmedic_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_app_user;

-- Revoke access to audits table for app user (audit logs are restricted)
REVOKE ALL ON audits FROM ffmedic_app_user;

-- Audit user: read-only access
GRANT USAGE ON SCHEMA ff_medic_db TO ffmedic_audit_user;
GRANT SELECT ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_audit_user;

-- Sequences (for INSERT operations)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ff_medic_db TO ffmedic_admin_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ff_medic_db TO ffmedic_app_user;

-- Default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ffmedic_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT USAGE, SELECT ON SEQUENCES TO ffmedic_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT SELECT ON TABLES TO ffmedic_audit_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT ALL ON TABLES TO ffmedic_admin_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT USAGE, SELECT ON SEQUENCES TO ffmedic_admin_user;
