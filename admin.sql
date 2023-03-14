/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : admin

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 14/03/2023 17:38:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for devices
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` decimal(12, 2) NOT NULL,
  `insurance_date` datetime(0) NOT NULL COMMENT '保险到期日期',
  `create_time` datetime(0) NOT NULL,
  `update_time` datetime(0) NOT NULL,
  `state` char(1) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '设备状态 0关闭 1启动',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of devices
-- ----------------------------
INSERT INTO `devices` VALUES (1, '精英一号', 299.99, '2023-03-14 14:00:00', '2023-03-14 17:27:59', '2023-03-14 17:27:59', '1');
INSERT INTO `devices` VALUES (2, '精英一号', 299.99, '2023-03-14 00:00:00', '2023-03-14 17:28:04', '2023-03-14 17:28:04', '1');
INSERT INTO `devices` VALUES (3, '精英一号', 299.99, '2023-03-14 00:00:00', '2023-03-14 17:28:19', '2023-03-14 17:28:19', '1');
INSERT INTO `devices` VALUES (4, '精英一号', 299.99, '2023-03-04 00:00:00', '2023-03-14 17:28:34', '2023-03-14 17:28:34', '1');
INSERT INTO `devices` VALUES (5, '精英一号', 300.00, '2023-03-04 00:00:00', '2023-03-14 17:28:47', '2023-03-14 17:28:47', '1');
INSERT INTO `devices` VALUES (6, '精英一号', 1999.20, '2023-03-04 00:00:00', '2023-03-14 17:29:43', '2023-03-14 17:29:43', '1');
INSERT INTO `devices` VALUES (7, '精英一号', 1999.20, '2023-03-04 00:00:00', '2023-03-14 17:29:45', '2023-03-14 17:29:45', '1');
INSERT INTO `devices` VALUES (8, '精英一号', 1999.20, '2023-03-04 00:00:00', '2023-03-14 17:29:46', '2023-03-14 17:29:46', '1');
INSERT INTO `devices` VALUES (9, '精英一号', 1111111.00, '2023-03-04 00:00:00', '2023-03-14 17:30:30', '2023-03-14 17:30:30', '1');
INSERT INTO `devices` VALUES (10, '精英一号', 1111111.00, '2023-03-04 00:00:00', '2023-03-14 17:30:31', '2023-03-14 17:30:31', '1');
INSERT INTO `devices` VALUES (11, '精英一号', 1111111.00, '2023-03-04 00:00:00', '2023-03-14 17:30:32', '2023-03-14 17:30:32', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'superadmin', '17c4520f6cfd1ab53d8745e84681eb49', NULL, NULL);
INSERT INTO `users` VALUES (7, 'superadmin1', '17c4520f6cfd1ab53d8745e84681eb49', NULL, NULL);
INSERT INTO `users` VALUES (9, 'superadmin2', '17c4520f6cfd1ab53d8745e84681eb49', '2023-03-14 16:48:27', '2023-03-14 16:48:27');

SET FOREIGN_KEY_CHECKS = 1;
