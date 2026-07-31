-- Crear tabla responsible
CREATE TABLE ff_medic_db.responsible (
  responsible_id SERIAL NOT NULL,
  attention_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  paternal_surname VARCHAR(50) NOT NULL,
  maternal_surname VARCHAR(50) NOT NULL,
  relationship ff_medic_db."RelationshipType" NOT NULL,
  relationship_other VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT responsible_pkey PRIMARY KEY (responsible_id),
  CONSTRAINT uq_responsible_attention UNIQUE (attention_id),
  CONSTRAINT fk_responsible_attention_id FOREIGN KEY (attention_id)
    REFERENCES ff_medic_db.attentions(attention_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear trigger de updated_at
CREATE TRIGGER trg_responsible_updated_at
  BEFORE UPDATE ON ff_medic_db.responsible
  FOR EACH ROW EXECUTE FUNCTION ff_medic_db.update_updated_at_column();

-- Crear trigger de auditoria
CREATE TRIGGER trg_responsible_audit
  AFTER INSERT OR UPDATE OR DELETE ON ff_medic_db.responsible
  FOR EACH ROW EXECUTE FUNCTION ff_medic_db.audit_trigger();

-- Agregar comentarios a la tabla
COMMENT ON TABLE ff_medic_db.responsible IS 'Datos del responsable del paciente en la atención';

-- Agregar comentarios a columnas
COMMENT ON COLUMN ff_medic_db.responsible.responsible_id IS 'Identificador único del responsable';
COMMENT ON COLUMN ff_medic_db.responsible.attention_id IS 'Identificador de la atención asociada';
COMMENT ON COLUMN ff_medic_db.responsible.name IS 'Nombres del responsable';
COMMENT ON COLUMN ff_medic_db.responsible.paternal_surname IS 'Apellido paterno del responsable';
COMMENT ON COLUMN ff_medic_db.responsible.maternal_surname IS 'Apellido materno del responsable';
COMMENT ON COLUMN ff_medic_db.responsible.relationship IS 'Parentesco con el paciente';
COMMENT ON COLUMN ff_medic_db.responsible.relationship_other IS 'Parentesco cuando es OTRO';
COMMENT ON COLUMN ff_medic_db.responsible.phone IS 'Teléfono del responsable';
COMMENT ON COLUMN ff_medic_db.responsible.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN ff_medic_db.responsible.updated_at IS 'Fecha de actualización del registro';
