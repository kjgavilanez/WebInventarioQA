import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';

void showAppToast(
  BuildContext context,
  String mensaje, {
  bool error = false,
}) {
  final messenger = ScaffoldMessenger.of(context);
  messenger.hideCurrentSnackBar();
  messenger.showSnackBar(
    SnackBar(
      content: Row(
        children: [
          Text(
            error ? '❌' : '✅',
            style: const TextStyle(fontSize: 16),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              mensaje,
              style: const TextStyle(color: AppColors.textPrimary, fontSize: 14),
            ),
          ),
        ],
      ),
      backgroundColor: AppColors.surface,
      duration: const Duration(seconds: 3),
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(
          color: error ? AppColors.danger : AppColors.success,
        ),
      ),
    ),
  );
}
