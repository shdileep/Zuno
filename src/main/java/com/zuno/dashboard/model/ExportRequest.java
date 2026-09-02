package com.zuno.dashboard.model;

import java.util.List;

public class ExportRequest {
    private String exportType; // EARNINGS, APPLICATIONS, OPPORTUNITIES, FULL_REPORT
    private String format; // CSV, JSON, PDF
    private String dateRange; // ALL, THIS_MONTH, LAST_3_MONTHS, THIS_YEAR
    private String profession;
    private List<String> fields;
    private String customNotes;

    public ExportRequest() {}

    public ExportRequest(String exportType, String format, String dateRange, String profession,
                         List<String> fields, String customNotes) {
        this.exportType = exportType;
        this.format = format;
        this.dateRange = dateRange;
        this.profession = profession;
        this.fields = fields;
        this.customNotes = customNotes;
    }

    // Getters and Setters
    public String getExportType() { return exportType; }
    public void setExportType(String exportType) { this.exportType = exportType; }

    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }

    public String getDateRange() { return dateRange; }
    public void setDateRange(String dateRange) { this.dateRange = dateRange; }

    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }

    public List<String> getFields() { return fields; }
    public void setFields(List<String> fields) { this.fields = fields; }

    public String getCustomNotes() { return customNotes; }
    public void setCustomNotes(String customNotes) { this.customNotes = customNotes; }
}
