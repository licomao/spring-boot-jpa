package com.dameng.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.UUID;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseEntity implements Serializable, Cloneable {

    private static final long serialVersionUID = -1;

    @Id
    @GeneratedValue(generator="native")
    @GenericGenerator(name="native", strategy="native")
    public long id;

    @Type(type="uuid-char")
    public UUID uid = UUID.randomUUID();

    @CreatedBy
    public String createdBy;

    @CreatedDate
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    public DateTime createdDate;

    @LastModifiedBy
    public String updatedBy;

    @LastModifiedDate
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    public DateTime updatedDate;

    @Version
    public Integer ver = 0;

    public Boolean deleted = false;

    //**************************************************************************
    // Serialization / Deserialization
    //**************************************************************************

    public static class IDSerializer extends JsonSerializer<BaseEntity> {
        @Override
        public void serialize(BaseEntity value, JsonGenerator jgen, SerializerProvider provider)
                throws IOException {
            jgen.writeNumber(value.id);
        }
    }

    public static class NameSerializer extends JsonSerializer<BaseEntity> {

        private final static Log log = LogFactory.getLog(NameSerializer.class);

        @Override
        public void serialize(BaseEntity value, JsonGenerator jgen, SerializerProvider provider)
                throws IOException {
            Field field = null;
            try {
                field = value.getClass().getField("name");
                String name = field.get(value).toString();
                jgen.writeString(name);
            } catch (Exception e) {
                log.error("Field 'name' is not found in "+value.getClass().getSimpleName()
                        +" during Json serialization.");
            }
        }
    }

    @Override
    public boolean equals(Object another) {
        if (another == null) return false;
        BaseEntity anotherBaseEntity = (BaseEntity) another;
        if (this.uid != null && anotherBaseEntity.uid != null
                && this.uid.equals(anotherBaseEntity.uid) && this.id == anotherBaseEntity.id) {
            return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.uid.hashCode() + new Long(this.id).hashCode();
    }

}
