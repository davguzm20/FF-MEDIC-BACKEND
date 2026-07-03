-- Admin user: full access
GRANT ALL ON SCHEMA ff_medic_db TO ffmedic_admin_user;
GRANT ALL ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_admin_user;

-- Application user permissions
GRANT USAGE ON SCHEMA ff_medic_db TO ffmedic_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_app_user;

-- Revoke access to audits for app user (audit logs are restricted)
REVOKE ALL ON ff_medic_db.audits FROM ffmedic_app_user;

-- Audit user: read-only access
GRANT USAGE ON SCHEMA ff_medic_db TO ffmedic_audit_user;
GRANT SELECT ON ALL TABLES IN SCHEMA ff_medic_db TO ffmedic_audit_user;

-- Sequences (for INSERT operations)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA ff_medic_db TO ffmedic_app_user;

-- Default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ffmedic_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT USAGE, SELECT ON SEQUENCES TO ffmedic_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA ff_medic_db GRANT SELECT ON TABLES TO ffmedic_audit_user;
