package com.masai.projectshelf.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cloudfront.AmazonCloudFront;
import com.amazonaws.services.cloudfront.AmazonCloudFrontClientBuilder;
import com.amazonaws.services.route53.AmazonRoute53;
import com.amazonaws.services.route53.AmazonRoute53ClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;


@Configuration
public class AwsS3Config {
    @Value("${amazon.aws.access-key}")
    private String accessKeyId;

    @Value("${amazon.aws.secret-key}")
    private String accessKeySecret;

    @Value("${amazon.aws.region}")
    private String s3RegionName;
    
 

    @Bean
    public AmazonS3 getAmazonS3Client() {
        final BasicAWSCredentials basicAwsCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(new AWSStaticCredentialsProvider(basicAwsCredentials))
            .withRegion(s3RegionName)
            .build();
    }
    @Bean
    public AmazonRoute53 getAmazonRoute53Client() {
        final BasicAWSCredentials basicAwsCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        return AmazonRoute53ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(basicAwsCredentials)).withRegion(s3RegionName).build();
    }
    
    @Bean
    public AmazonCloudFront getAmazonCloudFrontClientBuilder() {
        final BasicAWSCredentials basicAwsCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        return AmazonCloudFrontClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(basicAwsCredentials)).withRegion(s3RegionName).build();
    }
}
