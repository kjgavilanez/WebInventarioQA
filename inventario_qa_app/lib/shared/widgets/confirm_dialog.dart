import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';

Future<bool> showAppConfirmDialog(
  BuildContext context, {
  required String mensaje,
  String confirmar = 'Eliminar',
  String cancelar = 'Cancelar',
  Color? confirmarColor,
}) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('⚠️', style: TextStyle(fontSize: 32)),
          const SizedBox(height: 12),
          Text(
            mensaje,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontSize: 15,
              height: 1.4,
            ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(ctx).pop(false),
          child: Text(cancelar, style: const TextStyle(color: AppColors.textSecondary)),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(ctx).pop(true),
          style: ElevatedButton.styleFrom(
            backgroundColor: confirmarColor ?? AppColors.dangerStrong,
          ),
          child: Text(confirmar),
        ),
      ],
    ),
  );
  return result ?? false;
}
