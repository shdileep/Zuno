package com.zuno.dashboard.model;

public class PaymentRecord {
    private String id;
    private String applicationId;
    private String companyName;
    private String companyLogo;
    private String jobTitle;
    private double amount;
    private String monthPeriod; // e.g. "August 2026"
    private String status; // Credited, Pending Employer Verification, Processing
    private String transactionDate;
    private String referenceNo;
    private boolean employerPaid;

    public PaymentRecord() {}

    public PaymentRecord(String id, String applicationId, String companyName, String companyLogo,
                         String jobTitle, double amount, String monthPeriod, String status,
                         String transactionDate, String referenceNo, boolean employerPaid) {
        this.id = id;
        this.applicationId = applicationId;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.jobTitle = jobTitle;
        this.amount = amount;
        this.monthPeriod = monthPeriod;
        this.status = status;
        this.transactionDate = transactionDate;
        this.referenceNo = referenceNo;
        this.employerPaid = employerPaid;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getMonthPeriod() { return monthPeriod; }
    public void setMonthPeriod(String monthPeriod) { this.monthPeriod = monthPeriod; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTransactionDate() { return transactionDate; }
    public void setTransactionDate(String transactionDate) { this.transactionDate = transactionDate; }

    public String getReferenceNo() { return referenceNo; }
    public void setReferenceNo(String referenceNo) { this.referenceNo = referenceNo; }

    public boolean isEmployerPaid() { return employerPaid; }
    public void setEmployerPaid(boolean employerPaid) { this.employerPaid = employerPaid; }
}
